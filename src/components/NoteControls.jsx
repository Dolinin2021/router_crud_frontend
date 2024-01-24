import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class NoteControls extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    navigate: PropTypes.func,
  }

  render() {
    const {
      onEditClick: handleEditClick,
      onDeleteClick: handleDeleteClick,
    } = this.props;

    return (
      <div className="Note-controls">
        <Button
          className="Note-controls__button-edit"
          content="Изменить"
          onHandleClick={handleEditClick}
        />
        <Button
          className="Note-controls__button-delete"
          content="Удалить"
          type="submit"
          onHandleClick={() => {
            this.props.navigate("/");
            handleDeleteClick();
          }}
        />
      </div>
    );
  }
}

export default NoteControls;
