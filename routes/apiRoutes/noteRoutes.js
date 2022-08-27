const router = require('express').Router();
const path = require('path');

const { findById, createNewNote, validateNote, deleteNoteById } = require('../../lib/notes');
const { notes } = require('../../db/db.json');

//In here, everything shows as JSON

router.get('/notes', (req, res) => {
    let results = notes;
    res.sendFile(path.join(__dirname, '../../db/db.json'));
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {

    const result = deleteNoteById(req.params.id, notes);

    if (result) {
        // res.json(result);
        res.json({ok:true});
    } else {
        res.send(404);
    }
})

module.exports = router;