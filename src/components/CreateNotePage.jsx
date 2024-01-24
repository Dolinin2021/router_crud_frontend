import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import withNavigate from '../hocs/withNavigate';

const FormWithNavigate = withNavigate(Form);

class CreateNotePage extends React.Component {
  static propTypes = {
    onFormSubmit: PropTypes.func,
  }
  
  render() {
    return (
      <div className="Page">
        <FormWithNavigate
          title="Новый пост"
          btnName="Опубликовать"
          onSubmit={this.props.onFormSubmit}
        />
      </div>
    );
  }
}

export default CreateNotePage;
