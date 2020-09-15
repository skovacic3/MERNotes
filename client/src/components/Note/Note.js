import React from 'react';
import PropTypes from 'prop-types';

import '../Note.css';

const Note = props => {

    return (
        <li onClick={() => props.clicked(props.id)}>
            <a>
                <h3>{props.title}</h3>
                <p>{props.content}</p>
            </a>
        </li>
    );
};

Note.propTypes = {

};

export default Note;