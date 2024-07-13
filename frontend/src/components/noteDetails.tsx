import React, {useState} from 'react';
import useAuthContext from '../hooks/useAuthContext.tsx';
import useNotesContext from '../hooks/useNotesContext.tsx';

export default function NoteDetails({note}){
  const { dispatch } = useNotesContext();
  const {user} = useAuthContext();
  const [expandText, setExpandText] = useState(false)
  
  //Handles deleting a note
  async function HandleDelete(thisNote){
    const response = await fetch(`http://localhost:4000/api/notes/${thisNote}`, {
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${user.token}`}
    });

    const data = await response.json();

    if(!response.ok){
      throw Error(data.error)
    }

    if(response.ok){
      dispatch({type: 'DELETE_NOTE', payload: data})
    }
  }

  //Hanles updaing a note
  async function HandleEdit(thisNote){
    const response = await fetch(`http://localhost:4000/api/notes/${thisNote}`, {
      method: 'PATCH',
      headers: {'Authorization': `Bearer ${user.token}`}
    })

    const data = await response.json();

    if(response.ok){
      dispatch({type: 'UPDATE_NOTE', payload: data})
    }
  }
  
  return (
    <div className='note-item'>
      <h1>{note.title}</h1>
      {note.description.length < 100 ?
        <p>{note.description}</p>
      : 
        <div className='note-item-description'>
          {expandText ?
            <p>{note.description}</p>
          : <p>{note.description.slice(0, 100)}...</p>}
          <button onClick={() => setExpandText(prevState => !prevState)}>
            <p>{expandText ? 'Read Less' : 'Read More'}</p>
          </button>
        </div>
      }
      <div className='note-item-actions'>
        <button onClick={() => HandleEdit(note._id)}>
        <div className='note-item-icon'>
            <span className="material-symbols-outlined">
              app_registration 
            </span>
          </div>
        </button>
        <button onClick={() => HandleDelete(note._id)}>
          <div className='note-item-icon'>
            <span className="material-symbols-outlined">
            delete
            </span>
          </div>
        </button>
      </div>
    </div>
  )
}