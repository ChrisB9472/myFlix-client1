import React from 'react';
import axios from 'axios';
import "./main-view.scss";

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
export class MainView extends React.Component {

    constructor() {
        super();
    // Initial state is set to null
        this.state = {
          movies: [],
          selectedMovie: null,
          user: null
        };
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
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
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
    const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details 
    are *passed as a prop to the LoginView*/
    if(!user) return  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
        <div className="main-view">
                <Navbar expand="lg" bg="#162b48" variant="dark" className="mainNavbar">
                <Container>
                <Navbar.Brand href="#myflix">My Flix</Navbar.Brand>
                    <Nav className="me-auto">
                    
                    <button onClick={() => { this.onLoggedOut() }}>Logout</button>
                    </Nav>
                </Container>
                </Navbar>
        
              <Router>
                <Row className="main-view justify-content-md-center">
                  <Route exact path="/" render={() => {
                    return movies.map(m => (
                      <Col md={3} key={m._id}>
                        <MovieCard movie={m} />
                      </Col>
                    ))
                  }} />
        
                  {/* Register view */}
            <Route exact path="/register" render={() => {
              
                return <Col>
                  <RegistrationView
                  />
                </Col>
              }} />
        
        <Route path="/directors/:name" render={({ match }) => {
          if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <DirectorView Director={movies.find(m => m.director.name === match.params.name)} />
          </Col>
        }
        } />
        
        <Route path="/genres/:name" render={({ match }) => {
          if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <GenreView Genre={movies.find(m => m.genre.name === match.params.name)} onBackClick={() => history.goBack()} />
          </Col>
        }
        } />
        
        
        
        <Route path='/profile' render={({ history }) => {
                                
                              
                                return <Col md={12}>
                                    <Userview user={user} setUser={user => this.setUser(user)}
                                        movies={movies} onLoggedOut={() => this.onLoggedOut()} onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            }} />
        
                  <Route path="/movies/:movieId" render={({ match }) => {
                    return <Col md={8}>
                      <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                    </Col>
                  }} />
        
                </Row>
              </Router></div>
            );
          }
        }
        
        export default MainView;
        