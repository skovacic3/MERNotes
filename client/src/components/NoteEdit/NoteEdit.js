import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../Backdrop/Backdrop';

import './NoteEdit.css';

const NoteEdit = props => {

    const [title, setTitle] = useState(props.note.title);
    const [content, setContent] = useState(props.note.content);

    /*if (props.note.title) {
        setTitle(props.note.title);
    }

    if (props.note.content) {
        setContent(props.note.content);
    }*/

    const titleChanged = event => {
        setTitle(event.target.value);
    }

    const contentChanged = event => {
        setContent(event.target.value);
    }

    const updateHandler = () => {
        const note = { ...props.note };
        note.title = title;
        note.content = content;
        console.log("noteedit: " + note);
        props.update(note);
    }

    const addHandler = () => {
        const note = { title, content };
        props.new(note);
    }

    const deleteHandler = () => {
        props.delete(props.note);
    }

    return (
        <>
            <div className='NoteEdit'>
                {props.buttonText === 'Edit' ? <h2>Editing note</h2> : <h2>New note</h2>}
                <input onChange={titleChanged} type='text' value={title}></input>
                <textarea onChange={contentChanged} className="Content" type='text' value={content}></textarea>
                <br />
                {props.buttonText === 'Edit' ? <button onClick={updateHandler}>Edit</button> : <button onClick={addHandler}>Add note</button>}
                {props.buttonText === 'Edit' ? <button onClick={deleteHandler}>Delete</button> : null}
            </div >
            <Backdrop clicked={props.backdropClicked} />
        </>

    );
};

NoteEdit.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    clicked: PropTypes.func
};

export default NoteEdit;