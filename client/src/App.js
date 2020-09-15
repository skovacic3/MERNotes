import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import NoteList from './components/NoteList/NoteList';
import NoteEdit from './components/NoteEdit/NoteEdit';
const App = () => {

  const [notes, setNotes] = useState();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState();
  const [buttonText, setButtonText] = useState();

  useEffect(() => {
    loadData();
  }, [])

  const editClicked = (id) => {
    setShow(true);
    setButtonText('Edit');
    setSelected(notes.find(note => note._id === id));
    //console.log(notes);
  }

  const newClicked = () => {
    setShow(true);
    setButtonText('Add');
    setSelected({ title: "", content: "" });
  }

  const backdropClicked = () => {
    setShow(false);
  }

  const loadData = async () => {
    const res = await fetch('http://localhost:5000/notes/all');
    const data = await res.json();
    setNotes(data);
    console.log(data);
  }

  const updateNote = async (id, requestOptions) => {
    const req = await fetch('http://localhost:5000/notes/edit/' + id, requestOptions);
    setShow(false);
    await loadData();
  }

  const newNote = async (requestOptions) => {
    const req = await fetch('http://localhost:5000/notes/new', requestOptions);
    setShow(false);
    await loadData();
  }

  const deleteNote = async (id, requestOptions) => {
    const req = await fetch('http://localhost:5000/notes/delete/' + id, requestOptions);
    setShow(false);
    await loadData();
  }

  const updateHandler = (note) => {
    console.log("updatehandler " + note._id);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: note.title, content: note.content })
    };
    updateNote(note._id, requestOptions);
  }

  const newHandler = (note) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: note.title, content: note.content })
    };

    newNote(requestOptions);
  }

  const deleteHandler = note => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };

    deleteNote(note._id, requestOptions);
  }



  return (
    <div className="App">
      {notes === undefined ? <p>loading...</p> : <NoteList newNote={newClicked} clicked={editClicked} notes={notes} />}
      {show ? <NoteEdit buttonText={buttonText} backdropClicked={backdropClicked} note={selected} update={updateHandler} new={newHandler} delete={deleteHandler} /> : null}
    </div>
  );
}

export default App;
