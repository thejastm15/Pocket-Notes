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
        const json = await response.json()
        console.log(json)
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

        console.log('adding a note')
        const note = {
            "_id": "6501d55170899a088b5b3e9f",
            "user": "64eb76b19d01d290f19a6ee6fhg",
            "title": title,
            "description": description,
            "tag": "wake message",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }


    //Delete a note

    const deleteNote = async (id) => {
        //Calling API
        // const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYjc2YjE5ZDAxZDI5MGYxOWE2ZWU2In0sImlhdCI6MTY5MzE1Mjk1MX0.lXxsr7ULxb7hmIdt0mhGvWtUp_ZbQ-HAoLaEYRN_8q8"
        //     },
        //     body: JSON.stringify({ title, description, tag }),
        // });
        // const json = response.json();

        console.log('deleting item')
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //Calling API
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYjc2YjE5ZDAxZDI5MGYxOWE2ZWU2In0sImlhdCI6MTY5MzE1Mjk1MX0.lXxsr7ULxb7hmIdt0mhGvWtUp_ZbQ-HAoLaEYRN_8q8"
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = response.json();


        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }
    }



    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children};
        </NoteContext.Provider>
    )

}
export default NoteState