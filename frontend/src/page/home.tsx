import React from "react";
import CreateNote from '../components/createNote.tsx';
import GetNotes from "../components/getNotes.tsx";

export default function Home() {
  return (
    <div>
      <CreateNote/>
      <GetNotes/>
    </div>
  )
}