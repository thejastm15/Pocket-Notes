import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //Get all notes 
    const getNotes = async () => {
        //Calling API
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYjc2YjE5ZDAxZDI5MGYxOWE2ZWU2In0sImlhdCI6MTY5MzE1Mjk1MX0.lXxsr7ULxb7hmIdt0mhGvWtUp_ZbQ-HAoLaEYRN_8q8"
            },
        });
        const json = await response.json();
        setNotes(json)
    }

    //Add a note 
    const addNote = async (title, description, tag) => {
        //Calling API
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYjc2YjE5ZDAxZDI5MGYxOWE2ZWU2In0sImlhdCI6MTY5MzE1Mjk1MX0.lXxsr7ULxb7hmIdt0mhGvWtUp_ZbQ-HAoLaEYRN_8q8"
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const note = await  response.json();
        setNotes(notes.concat(note))
    }


    //Delete a note

    const deleteNote = async (id) => {
        //Calling API
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYjc2YjE5ZDAxZDI5MGYxOWE2ZWU2In0sImlhdCI6MTY5MzE1Mjk1MX0.lXxsr7ULxb7hmIdt0mhGvWtUp_ZbQ-HAoLaEYRN_8q8"
            },
        });
        const json = await response.json();

        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //Calling API
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYjc2YjE5ZDAxZDI5MGYxOWE2ZWU2In0sImlhdCI6MTY5MzE1Mjk1MX0.lXxsr7ULxb7hmIdt0mhGvWtUp_ZbQ-HAoLaEYRN_8q8"
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
            
        }
        setNotes(newNotes)
    }
    



    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children};
        </NoteContext.Provider>
    )

}
export default NoteState