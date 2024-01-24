import ruLocale from 'date-fns/locale/ru';
import { formatDistanceToNowStrict } from 'date-fns';
import { Link } from "react-router-dom";
import React from 'react';
import PropTypes from 'prop-types';
import NoteControls from './NoteControls';
import withNavigate from '../hocs/withNavigate';

const NoteControlsWithNavigate = withNavigate(NoteControls);

class Note extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    created: PropTypes.number,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    onView: PropTypes.bool,
  }
  
  constructor(props) {
    super(props);
    this.getDistanceToNow = this.getDistanceToNow.bind(this);
  }

  getDistanceToNow(created) {
    const result = formatDistanceToNowStrict(
      new Date(Number(created)),
      { locale: ruLocale }
    );
    return result;
  }

  render() {
    const {
      id,
      text,
      created,
      onEditClick: handleEditClick,
      onDeleteClick: handleDeleteClick,
      onView
    } = this.props;

    const noteControls = <NoteControlsWithNavigate
      onEditClick={handleEditClick}
      onDeleteClick={() => handleDeleteClick(id)}
    />;

    const textWithLink = <Link to={`/notes/${id}`}>
      {text}
    </Link>;

    return (
      <div className="Note">
        <span className="Note__elapsed-time">
          {this.getDistanceToNow(created)}
        </span>
        <div className="Note-body" id={id}>
          <p className={onView && "Note-body__text"}>
            {onView ? text : textWithLink}
          </p>
        </div>
        {handleDeleteClick && noteControls}
      </div>
    );
  }
}

export default Note;
