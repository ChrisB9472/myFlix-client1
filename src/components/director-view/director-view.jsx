import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import "./director-view.scss";

 export function DirectorView (props)  {
  const { director } = props; 
  console.log (props);
  return (
    <div className="director-view">
     <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{props.Director.director.name}</span> 
             
        </div>
        <div >
          <span >Biography: </span>
          <span >{props.Director.director.bio}</span>     
        </div>  
        <div >
          <span >Year of Birth: </span>
          <span >{props.Director.director.birth}</span>      
        </div>
        <Link to={`/`}>
                <Button className='returnButton' variant='dark'>Return to Movie List</Button>
              </Link>
              
      
      </div>
       
  )}
  