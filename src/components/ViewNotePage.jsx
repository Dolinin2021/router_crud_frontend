import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import Note from './Note';
import withNavigate from '../hocs/withNavigate';
import initFetch from '../functions/initFetch';
const { getCurrentNote } = initFetch('http://localhost:7070/');

const FormWithNavigate = withNavigate(Form);

class ViewNotePage extends React.Component {
  static propTypes = {
    created: PropTypes.number,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    onFormSubmit: PropTypes.func,
    params: PropTypes.object,
    onView: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      text: '',
      created: 0,
      editingMode: false,
    };
    this.toggleEditingMode = this.toggleEditingMode.bind(this);
  }
  
  componentDidMount() {
    getCurrentNote('notes/', this.props.params.id)
      .then((data) => {
        this.setState({ ...data });
      })
      .catch((error) => console.log("Could not load the note", error));
  }

  toggleEditingMode() {
    this.setState({ editingMode: !this.state.editingMode })
  }

  render() {
    const {
      id,
      text,
      created,
    } = this.state;

    const {
      onDeleteClick: handleDeleteClick,
    } = this.props;

    const note = <Note
      id={id}
      text={text}
      created={created}
      onEditClick={this.toggleEditingMode}
      onDeleteClick={handleDeleteClick}
      onView={true}
    />;

    const editing = <FormWithNavigate
      id={id}
      text={text}
      title="Редактировать публикацию"
      btnName="Сохранить"
      onSubmit={this.props.onFormSubmit}
      onGoBackClick={this.toggleEditingMode}
    />;

    return (
      <div className="Page">
        {!this.state.editingMode ? note : editing}
      </div>
    );
  }
}

export default ViewNotePage;
