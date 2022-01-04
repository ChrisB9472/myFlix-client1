import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

import "./actor-view.scss";

 export function Actorview (props)  {
  const { actor } = props; 
  console.log (actor);
  return (
    <div className="actor-view">
     <div className="actor-name">
          <span className="label">Name: </span>
          <span className="value">{actor.Name}</span> 
             
        </div>
        <div className="actor-bio">
          <span className="label">Biography: </span>
          <span className="value">{actor.Bio}</span>     
        </div>  
        <div className="actor-birthyear">
          <span className="label">Year of Birth: </span>
          <span className="value">{actor.Birth}</span>      
        </div>
        <div className="actor-birthyear">
          <span className="label">Death Year: </span>
          <span className="value">{actor.Death}</span>      
        </div>
        <Link to={`/`}>
                <Button className='returnButton' variant='dark'>Return to Movie List</Button>
              </Link>
              
      
      </div>
       
  )}