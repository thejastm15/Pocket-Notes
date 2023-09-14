import React,{useContext,useEffect} from 'react'
import noteContext from "../context/notes/NoteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export default function Notes() {
    
  const context = useContext(noteContext)
  const {notes,getNotes}= context;
  useEffect(() => {
    getNotes()

  }, [])
  

  return (
    <>
    <AddNote/>
    <div className='row my-3'>
        <h1>here is your notes</h1>
      {notes.map ((note)=>{
        return <NoteItem key ={note._id} note={note}/>
      })}
    </div>
    </>
  )
}
