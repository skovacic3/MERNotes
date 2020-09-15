import React from 'react';
import PropTypes from 'prop-types';

import Note from '../Note/Note';
import NewNote from '../NewNote/NewNote';
import '../Note.css';

const NoteList = props => {

    return (
        <div>
            <ul>
                {props.notes.map(note => <Note key={note._id} id={note._id} clicked={props.clicked} title={note.title} content={note.content} />)}
                <NewNote clicked={props.newNote} />
            </ul>
        </div>
    );
};

NoteList.propTypes = {

};

export default NoteList;