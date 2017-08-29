import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResetFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
    };
  }

  resetFilters() {
    if (!this.state.confirm) {
      this.setState({ confirm: true });
    } else {
      this.props.resetFilters();
    }
  }

  render() {
    const { confirm } = this.state;
    const text = confirm ? 'Are you sure?' : 'Reset Filters';
    return (
      <div>
        <button className={confirm ? 'usa-button-secondary' : null} onClick={() => this.resetFilters()}>{text}</button>
      </div>
    );
  }
}

ResetFilters.propTypes = {
  resetFilters: PropTypes.func.isRequired,
};

export default ResetFilters;