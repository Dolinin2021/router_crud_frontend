import { Link } from "react-router-dom";
import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';

class Home extends React.Component {
  static propTypes = {
    notes: PropTypes.array,
  }

  render() {
    return (
      <div className="Page">
        <Link className="Button Home__button-create" to="/notes/new">Создать запись</Link>
        <div className="Home__notes-container">
          {this.props.notes.map(({ id, text, created }) => {
            return (
              <Note
                key={id}
                id={id}
                text={text}
                created={created}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
