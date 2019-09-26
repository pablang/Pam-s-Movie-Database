import React from 'react';
import axios from 'axios'
// import logo from './logo.svg';
import './App.css';

function Movie (props) {
  return (
    <div onClick={() => props.onRemove(props.data.imdbID)}>
      <h2>{props.data.Title}</h2>
      <p>{props.data.Year}</p>
    </div>
  )
}

class App extends React.Component {

  state = {
    movies: [],
    searchTerm: '',
    isFetching: false
  }

  handleSubmit = e => {
    // prevent default of the form
    e.preventDefault()
    // get moveie title from input box
    // make a request to omdb api
    //  we need a module - axios
    const { searchTerm } = this.state
    const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=2f6435d9`
    axios.get(url).then(res => {
      console.log(res) // res comes back with metadata so you need to specify its only data

      this.setState({
        movies: res.data.Search,
        isFetching: false
      })
    })
    this.setState({
      isFetching: true
    })
  }

  handleChange = e =>{
    this.setState({
      searchTerm: e.target.value
    })
  }

  removeMovie = (indexOfMovie) => {
    const { movies } = this.state
    this.setState({
      movies: movies.filter((movie) => movie.imdbID !== indexOfMovie)
    })
  }

  // this function is can also go into the JSX but it looks neater if you remove it
  renderMovie = movie => (
    // give it a key so it has a uniqueID
    // we already have one from the movie api under imdbID
    // the removeMovie function is wrapped in another function to make it a callback
    <div key={movie.imdbID} className="movie-container">
      <h2>{movie.Title}</h2>
      <p>{movie.Year}</p>
      <img src={movie.Poster} alt=""/>
      <button onClick={() => this.removeMovie(movie.imdbID)}>Remove</button>
    </div>
  )



  render () {
    const { movies, isFetching } = this.state

    return (
      <div className="App">
        <h1>PMDB</h1>
        <p>Pam's movie database</p>
        {/* add a eventlistener on the form */}
        <form onSubmit={this.handleSubmit} action="">
          <input onChange={this.handleChange} type="text"/>
          <button>search</button>
        </form>

        <section>

            { isFetching ?
            <p>loading...</p> :
            movies.map(this.renderMovie) }
        </section>
      </div>
    );
  }
}

export default App;
