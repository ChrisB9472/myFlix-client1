import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

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
</Link>

<Link to={`/genres/${movie.genre.name}`}>
  <Button variant="link">Genre</Button>
</Link>
            
    
          </div>
        );
      }
    }