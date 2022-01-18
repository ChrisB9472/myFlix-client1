import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';



 export function GenreView (props)  {
  const { genre } = props; 
  console.log (props);
  return (
    <div>
     <div>
          <span className="label">Name: </span>
          <span className="value">{}</span> 
             
        </div>
        <div >
          <span >Description: </span>
          <span >{}</span>     
        </div>  
        <div >
          <span >Year of Birth: </span>
          <span >{}</span>      
        </div>
        <Link to={`/`}>
                <Button className='returnButton' variant='dark'>Return to Movie List</Button>
              </Link>
              
      
      </div>
       
  )}
  