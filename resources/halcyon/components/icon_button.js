import React from 'react';
import PropTypes from 'prop-types';

export default class IconButton extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func,
  }

  render () {
    const { className, icon, title, active, onClick, ...other } = this.props;

    return (
      <button
        className={className}
        title={title}
        aria-label={title}
        onClick={onClick}
        {...other}
      >
        <i className={icon} aria-hidden='true' />
      </button>
    );
  }

}
