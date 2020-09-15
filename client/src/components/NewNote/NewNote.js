import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';

import '../Note.css';

const NewNote = props => {

    return (
        <li onClick={props.clicked}>
            <a>
                <AddIcon className="plus" fontSize="large" />
            </a>
        </li>
    );
};

NewNote.propTypes = {
    clicked: PropTypes.func
};

export default NewNote;