import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  static propTypes = {
    className: PropTypes.string, 
    type: PropTypes.string, 
    onHandleClick: PropTypes.func,
    content: PropTypes.string,
  }
  
  render() {
    const {
      className,
      type = 'button',
      onHandleClick,
      content,
    } = this.props;

    return (
      <button
        className={`Button ${className}`}
        type={type}
        onClick={onHandleClick}
      >
        {content}
      </button>
    );
  }
}

export default Button;
