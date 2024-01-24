import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Form extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    navigate: PropTypes.func,
    title: PropTypes.string,
    onSubmit: PropTypes.func,
    btnName: PropTypes.string,
    onGoBackClick: PropTypes.func,
  }
  
  constructor(props) {
    super(props);
    this.state = { id: this.props.id, text: this.props.text };
    this.textRef = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.text === '') {
      this.textRef.current.focus();
    }
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState(prevForm => ({ ...prevForm, [name]: value }));
  }

  handleGoBack() {
    this.props.navigate(-1);
  }

  render() {
    const {
      title,
      onSubmit: handleFormSubmit,
      btnName,
      onGoBackClick: handleGoBackClick,
    } = this.props;

    return (
      <form
        className="Form"
        onSubmit={(event) => {
          event.preventDefault();
          this.handleGoBack();
          handleFormSubmit(this.state);
        }}
      >
        <div className="Form-control">
          <label htmlFor="text">{title}</label>
          <textarea
            className="Form-control__text"
            type="text"
            id="text"
            name="text"
            value={this.state.text}
            onChange={this.handleInputChange}
            ref={this.textRef}
            rows="3"
            autoComplete="off"
            required
          />
        </div>
        <Button
          className="Form-control__button-add"
          type="submit"
          content={btnName}
        />
        <a
          href="#0"
          className="Form__button-go-back"
          onClick={handleGoBackClick || this.handleGoBack}
        >
          &times;
        </a>
      </form>
    );
  }
}

export default Form;
