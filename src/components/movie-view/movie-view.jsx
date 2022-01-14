import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  addFavoriteMovie() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://evening-caverns-13073.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'POST'
    })
        .then(response => {
            alert(`Added to Favorites List`)
        })
        .catch(function (error) {
            console.log(error);
        });
};

    render() {
        const { movie, onBackClick } = this.props;

      
    
        return (
          <div className="movie-view">
            <div className="movie-poster">
              <img src={movie.imagePath} />
            </div>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.title}</span>
            </div>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.description}</span>
            </div>
            <Link to={`/`}>
            <Button variant="link">Back</Button>
          </Link>
          <Link to={`/directors/${movie.director.name}`}>
  <Button variant="link">Director</Button>
  <Button variant="outline-primary" className="btn-outline-primary" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>Add to Favorites</Button>
</Link>

          </div>
        );
      }
    }