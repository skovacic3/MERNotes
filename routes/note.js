const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Note = require('../models/Note');


// @route  POST notes
// @desc   Add new note
// @access Public
router.post('/new', [
    check('title', 'Please enter a title').not().isEmpty(),
    check('content', 'Please enter content').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;

    try {
        let note = await Note.findOne({ title });

        if (note) {
            return res.status(400).json({ errors: [{ msg: 'Note with that title already exists' }] });
        }

        note = new Note({ title, content });

        await note.save();
        return res.json({ msg: "Note added successfully" });
    } catch (err) {
        res.status(500).json({ errors: [{ msg: err }] });
    }
})

// @route  POST note
// @desc   Update note
// @access Public
router.post('/edit/:id', [
    check('title', 'Please enter a title').not().isEmpty(),
    check('content', 'Please enter some content').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const id = { _id: req.params.id };
        const update = { title, content } = req.body;

        let note = await Note.findById(id);

        if (note) {
            await Note.findOneAndUpdate(id, update, { new: true });
            return res.status(200).json({ msg: 'Update succesfull' });
        }
        else {
            return res.status(400).json({ error: 'Invalid note id' });
        }
    } catch (err) {
        return res.status(400).json({ errors: err.message });
    }
})

// @route  DELETE note
// @desc   Delete note
// @access Public
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = { _id: req.params.id };

        let note = await Note.findById(id);

        if (note) {
            note = await Note.findOneAndDelete(id);
            return res.status(200).json({ msg: `Deleted ${note.title}` });
        }
        else {
            return res.status(400).json({ error: 'Invalid note id' });
        }

    } catch (err) {
        return res.status(400).json({ errors: err.message });
    }
})


// @route  GET notes
// @desc   Get all notes
// @access Public
router.get('/all', async (req, res) => {
    try {
        const notes = await Note.find({}).lean();
        const noteContainer = [];

        notes.forEach(note => noteContainer.push(note));
        return res.send(noteContainer);
    } catch (err) {
        return res.status(400).json({ errors: err.message });
    }
});

module.exports = router;