import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


import { BrowserRouter as Router, Route } from "react-router-dom";

import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from "../genre-view/genre-view";
import { Actorview } from '../actor-view/actor-view';
import { RegistrationView } from '../registration-view/registration-view'
import { Userview } from '../user-view/user-view';

import { DirectorView } from '../director-view/director-view';

// #0
import { setMovies, setUser } from '../../actions/actions';

// we haven't written this one yet
import MoviesList from '../movies-list/movies-list';
/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/


// #2 export keyword removed from here
class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
        // movies: [],
        selectedMovie: null,
        // user: null,
        favorites: []
    }
    this.getUser = this.getUser.bind(this)

}


      componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
        }
      }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://evening-caverns-13073.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
     // #4
     this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  getUser() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .get(`https://evening-caverns-13073.herokuapp.com/user/username/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          name: response.data.Name,
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favorites: response.data.Favorites
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {

    let { movies } = this.props;
    const { username, password, email, birthday, favorites, user, register } = this.state;
    //  if (!user) return <Row>
    //     <Col>
    //         <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    //     </Col>
    // </Row>
    // if (movies.length === 0) return <div className="main-view" />;
    console.log('!', movies[0])

    return (
        <Router>
            <Route exact path="/" render={() => {
                console.log('login')
                if (user) return <NavBarView user={user} />;

                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;


            }} />


            <Route exact path="/register" render={() => {
                if (user) return <Redirect to="/" />
                return <RegistrationView />
            }} />



            <div className="main-view ">
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {


                        if (!user)
                            return (
                                <Col>
                                    <LoginView
                                        onLoggedIn={(user) => this.onLoggedIn(user)}
                                    />
                                </Col>
                            );
                        if (movies.length === 0) return <div className="main-view" />;
                        console.log(this.state);
                        return <MoviesList movies={movies} />;
                    }} />
                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (movies.length === 0) return <div className="main-view" />;
                        console.log(movies)
                        return <Col lg={9}>
                            <NavBarView user={user} />
                            <br />
                            <br />
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                                onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route exact path="/genres/:name" render={({ match, history }) => {

                        // get alll movies for a genre

                        // 1. get a list of all movies
                        // 2. determine the gennre for each movie
                        // 3. keep only those moviess whose gennre iss our target genre

                        let targetGenreMovies = []

                        movies.forEach((movie) => {
                            const movieGenreName = movie.Genre.Name
                            const targetGenreName = match.params.name
                            console.log('>', movieGenreName, targetGenreName)

                            if (movieGenreName === targetGenreName) {
                                // if this is the case, then we have found a movie for target genre
                                targetGenreMovies.push(movie)
                            }
                        })
                        console.log('targetGenreMovies', targetGenreMovies)

                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col lg={9}>
                            <NavBarView user={user} />
                            <br />
                            <br />
                            <br />
                            <GenreView movieData={targetGenreMovies} genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>

                    }

                    } />
                    <Route exact path="/directors/:name" render={({ match, history }) => {

                        let targetDirectorMovies = []

                        movies.forEach((movie) => {
                            const movieDirectorName = movie.Director.Name
                            const targetDirectorName = match.params.name
                            console.log('>', movieDirectorName, targetDirectorName)

                            if (movieDirectorName === targetDirectorName) {
                                // if this is the case, then we have found a movie for target genre
                                targetDirectorMovies.push(movie)
                            }
                        })
                        console.log('targetDirectorMovies', targetDirectorMovies)

                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col lg={9}>
                            <NavBarView user={user} />
                            <br />
                            <br />
                            <br />


                            <DirectorView movieData={targetDirectorMovies} director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }

                    } />
                    <Route exact path="/users/:username" render={({ match, history }) => {
                        console.log('Gott Userrrrr')



                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col lg={9}>

                            <NavBarView user={user} />
                            <br />
                            <br />
                            <br />
                            <UserView
                                getUser={this.getUser}
                                onBackClick={() => history.goBack()}
                                removeMovie={(_id) => this.onRemoveFavorite(_id)}
                            />
                        </Col>

                    }
                    } />

                </Row>
            </div>
        </Router>
    );

}
}
let mapStateToProps = state => {
return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);