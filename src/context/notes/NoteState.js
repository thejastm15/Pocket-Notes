import React, {useState} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
   const notesInitial = [
    {
      "_id": "6501d45f5f6ef9eb990b3418",
      "user": "64eb76b19d01d290f19a6ee6",
      "title": "mytitle",
      "description": "hello how are you",
      "tag": "wake message",
      "__v": 0
    },
    {
      "_id": "6501d55170899a088b5b3e9f",
      "user": "64eb76b19d01d290f19a6ee6",
      "title": "rockey",
      "description": "hello how are you rockey",
      "tag": "wake message",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)

    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children};
        </NoteContext.Provider>
    )
}

export default NoteState