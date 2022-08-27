const fs = require("fs");
const path = require("path");

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );

    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

function deleteNoteById(id, notesArray) {
    console.log("id",id);
    console.log("notesArray", notesArray);
    const resultArray = notesArray.filter(note => note.id !== id);
    console.log("resultArray", resultArray);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(resultArray, null, 2)
    );

    return resultArray;
}

module.exports = {
    findById,
    createNewNote,
    validateNote,
    deleteNoteById
};