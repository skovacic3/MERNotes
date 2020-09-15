import React from 'react';
import PropTypes from 'prop-types';

import './Backdrop.css';

const Backdrop = props => {
    return (
        <div className="Backdrop" onClick={props.clicked}></div>
    );
};

Backdrop.propTypes = {
    show: PropTypes.bool,
    clicked: PropTypes.func
};

export default Backdrop;