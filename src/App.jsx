import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import initFetch from './functions/initFetch';
import HomePage from './components/HomePage';
import CreateNotePage from './components/CreateNotePage';
import ViewNotePage from './components/ViewNotePage';
import withParams from './hocs/withParams';
const { get, post, put, del } = initFetch('https://backend-qgqf.onrender.com/');
const ViewNotePageWithParams = withParams(ViewNotePage);

class App extends React.Component {
  static propTypes = {
    notes: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    get('notes/')
      .then((data) => {
        this.setState({ notes: data });
      })
      .catch((error) => console.log("Could not load notes", error));
  }

  handleFormSubmit = ({ id, text }) => {
    post('notes/', { id, text })
      .then((data) => {
        this.setState({ notes: data });
      })
      .catch((error) => console.log("Could not upload the note", error));
  }

  handleFormEdit = ({ id, text }) => {
    put('notes/', { id, text })
    .then((data) => {
      this.setState({ notes: data });
    })
    .catch((error) => console.log("Could not upload the note", error));
  }

  handleDeleteClick = (id) => {
    del('notes/', id)
      .then((data) => {
        this.setState({ notes: data });
      })
      .catch((error) => console.log("Could not delete the note", error));
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-wrapper">
            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      notes={this.state.notes}
                    />
                  }
                />
                <Route
                  path="/notes/new"
                  element={
                    <CreateNotePage
                      onFormSubmit={this.handleFormSubmit}
                    />
                  }
                />
                <Route
                  path="/notes/:id"
                  element={
                    <ViewNotePageWithParams
                      onFormSubmit={this.handleFormEdit}
                      onDeleteClick={this.handleDeleteClick}
                      get={get}
                    />
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
