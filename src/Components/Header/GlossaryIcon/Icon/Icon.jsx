import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { EMPTY_FUNCTION } from '../../../../Constants/PropTypes';
import InteractiveElement from '../../../InteractiveElement';

const Icon = ({ onClick }) => (
  <InteractiveElement
    className="icon-alert-container glossary-icon"
    type="div"
    title="View the glossary"
    onClick={onClick}
  >
    <FontAwesome name="book" />
  </InteractiveElement>
);

Icon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

Icon.defaultProps = {
  onClick: EMPTY_FUNCTION,
};

export default Icon;