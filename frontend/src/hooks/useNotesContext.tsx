import { NotesContext } from "../context/NoteContext.tsx";
import React, {useContext} from 'react'

export default function useNotesContext() {
  const context = useContext<any>(NotesContext);

  if(!context){
    throw Error('useNotesContext must be used inside an NotesContextProvider')
  }

  return context
}