'use client'

import React, {useState} from "react";

export default function CreateNote(){
  const [formState, setFormState] = useState({
    title: '',
    description: ''
  })

  const HandleFormChange = (e) => {
    const {name, value} = e.target

    setFormState(prevState => {
      const newState = {...prevState,
        [name]: value
      }

      return newState
    })
  }

  const HandleSubmit = (e) => {
    e.preventDefault();
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