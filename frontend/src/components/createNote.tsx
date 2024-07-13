'use client'

import React, {useState} from "react";
import useNotesContext from "../hooks/useNotesContext.tsx";
import useAuthContext from "../hooks/useAuthContext.tsx";

export default function CreateNote(){
  const [error, setError] = useState<null | string>(null);
  const [formState, setFormState] = useState({
    title: '',
    description: ''
  });

  const { dispatch } = useNotesContext();
  const { user } = useAuthContext();


  const HandleFormChange = (e) => {
    const {name, value} = e.target

    setFormState(prevState => {
      const newState = {...prevState,
        [name]: value
      }

      return newState
    })
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if(!user){
      setError('You must be logged in');
      return
    }

    const note = {title: formState.title, description: formState.description}

    const response = await fetch('http://localhost:4000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify(note)
    })

    const data = await response.json();

    if(!response.ok){
      setError(data.error);
    }

    console.log(JSON.stringify(note))

    if(response.ok){
      setFormState(prevState => {
        const newState = {
          title: '',
          description: ''
        }
        return newState
      })

      dispatch({type: 'CREATE_NOTE', payload: data})
    }
  }
  
  return (
    <div className="create-note" onSubmit={HandleSubmit}>
      <h1>Create note</h1>
      <form>
        <label htmlFor="title">Title</label>
        <input 
          type="text"
          name="title"
          onChange={(e) => HandleFormChange(e)}
        >
        </input>
        <label htmlFor="description">Description</label>
        <textarea 
          name="description"
          onChange={(e) => HandleFormChange(e)}
        >
        </textarea>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  )
}