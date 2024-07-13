import React, {useEffect} from 'react'
import useAuthContext from '../hooks/useAuthContext.tsx'
import useNotesContext from '../hooks/useNotesContext.tsx';
import NoteDetails from './noteDetails.tsx';

export default function GetNotes() {
  const {notes, dispatch} = useNotesContext();
  const {user} = useAuthContext();
  
  useEffect(() => {
    //Fetch notes from the server, sends the user token and user_id, then sends back all the notes that contain that user_id
    const fetchNotesData = async () => {
      const response = await fetch('http://localhost:4000/api/notes', {
        method: 'GET',
        headers: {'Authorization': `Bearer ${user.token}`}
      })

      const data = await response.json();

      if(!response.ok){
        throw Error('An error occured while fetching')
      }
      if(response.ok){
        dispatch({type: 'SET_NOTES', payload: data})
      }
    }

    if(user){
      fetchNotesData()
    }
  }, [dispatch, user])

  return (
    <div className='note-item-container'>
      {notes ?
        notes.map((note) => {
          return (
            <div key={note._id} className='note-item-content'>
              <NoteDetails note={note}/>
            </div>
          )
        })
      : <p>Loading...</p>}
    </div>
  )
}