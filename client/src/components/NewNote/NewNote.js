import React from 'react';
import PropTypes from 'prop-types';

import '../Note.css';
import Plus from '../../plus.png';

const NewNote = props => {

    return (
        <li onClick={props.clicked}>
            <a>
                <img src={Plus} />
            </a>
        </li>
    );
};

NewNote.propTypes = {

};

export default NewNote;