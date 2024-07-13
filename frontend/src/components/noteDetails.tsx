import React from 'react';
import useAuthContext from '../hooks/useAuthContext.tsx';
import useNotesContext from '../hooks/useNotesContext.tsx';

export default function NoteDetails({note}){
  const { dispatch } = useNotesContext();
  const {user} = useAuthContext();
  
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
      <p>{note.description}</p>
      <div className='note-item-actions'>
        <button onClick={() => HandleDelete(note._id)}>
          D
        </button>
        <button onClick={() => HandleEdit(note._id)}>
          
        </button>
      </div>
    </div>
  )
}