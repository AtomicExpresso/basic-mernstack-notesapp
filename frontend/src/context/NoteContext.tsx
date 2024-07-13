import React, {createContext, useReducer} from "react";

export const NotesContext = createContext();

export const noteReducer = (state, action) => {
  switch(action.type){
    case "SET_NOTES":
      return {notes: action.payload}
    case "CREATE_NOTE":
      return {notes: [action.payload, ...state.notes]}
    case "UPDATE_NOTE":
      return {notes: [...state.notes]}
    case "DELETE_NOTE":
      return {
        notes: state.notes.filter((note) => note._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const NotesContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(noteReducer, {
    notes: null
  });

  return (
    <NotesContext.Provider value={{...state, dispatch}}>
      {children}
    </NotesContext.Provider>
  )
}