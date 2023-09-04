const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// ROUTE 1 :  Get all the notes using: GET "/api/notes/getuser". Login required.

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json([notes])
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error')
    }

})


// ROUTE 2 : Add a new note using : POST "/api/notes/addnote". Login required.

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be 5 letter character').isLength({ min: 5 })], async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            // if there is error return bad request 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()
            res.json([savedNote])
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal server error')
        }
    })

// ROUTE 3 : Update an existing note : POST "/api/notes/updatenote". Login required.

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //Create a new note object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    if (note.user.toString() !== req.user.id) {
        return res.status(404).send('Not Allowed');
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(note)
})


module.exports = router