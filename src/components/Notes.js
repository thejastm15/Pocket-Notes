import React,{useContext} from 'react'
import noteContext from "../context/notes/NoteContext"
import NoteItem from './NoteItem';

export default function Notes() {
    
  const context = useContext(noteContext)
  const {notes,setNotes}= context;

  return (
    <div className='row my-3'>
        <h1>here is your notes</h1>
      {notes.map ((note)=>{
        return <NoteItem note={note}/>
      })}
    </div>
  )
}
