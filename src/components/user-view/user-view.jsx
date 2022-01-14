import React from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './user-view.scss';



export class Userview extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null ,
      email: null,
      birthday: null,
      favorites: [],
    };
  }


  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
}

onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
        user: null,
    });
    window.open("/", "_self");
}

getUser = (token) => {
    const username = localStorage.getItem("user");
    axios
        .get(`https://evening-caverns-13073.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday,
                FavoriteMovies: response.data.FavoriteMovies,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

  
  

  onRemoveFavorite = (e, movie) => {
    const username = localStorage.getItem('user');
    console.log(username)
    const token = localStorage.getItem('token');
    console.log(this.props)
    axios.delete(`https://evening-caverns-13073.herokuapp.com/user/favorites/delete/${username}/movies/${movie._id}`, 
    { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert("Movie was removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteUser() {

    const answer = window.confirm("Are you sure you want to delete your account?");
    if (answer) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
        axios.delete( `https://evening-caverns-13073.herokuapp.com/user/delete/${user}`,
          { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            alert(user + " has been deleted.");
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.pathname = "/";
          })
          .catch(function (error) {
              console.log(error);
          })};
          
      }

      editUser(e) {
        e.preventDefault();
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
    
        axios.put(`https://evening-caverns-13073.herokuapp.com/users/${username}`,
          {
            Name: this.state.name,
            Username: this.state.username,
            Password: this.state.password,
            Email: this.state.email,
            Birthday: this.state.birthday
          },
          { headers: { Authorization: `Bearer ${token}` }
          })
          .then((response) => {
            this.setState({
              Name: response.data.Name,
              Username: response.data.Username,
              Password: response.data.Password,
              Email: response.data.Email,
              Birthday: response.data.Birthday
            });
            localStorage.setItem('user', response.data.Username);
            const data = response.data;
            console.log(data);
            console.log(this.state.Username);
            alert('Profile updated');
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          })
      }

     

      setUsername(value) {
        this.state.user = value;
      }
    
      setPassword(value) {
        this.state.password = value;
      }
    
      setEmail(value) {
        this.state.email = value;
      }
    
     


   render() {
    const { name,  user, Email, Birthday, favorites  } = this.props
console.log(this.props)


    return(
      <Container className="UserView">
        <Row className="justify-content-md-center">
          <Col className="user-info">
          <div className="profileContent">
            <h1>MY PROFILE</h1>
          </div>
            
            <h4>Username: {user}</h4>
         
          </Col>
        </Row>
          <div className="profileInformation">        
          <Form className="formDisplay" onSubmit={(e) => this.editUser(e)}>
          <div>
            <h3>EDIT PROFILE</h3>
          </div>
          

            <Form.Group>
              Username
              <Form.Control type='text' name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} required />
            </Form.Group>

            <Form.Group>
              Password
              <Form.Control type='password' name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} required />

            </Form.Group>
            <Form.Group>
              Email Address
              <Form.Control type='email' name="Email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)} required />

            </Form.Group>
            
            <div className="marginSpacer">
              <Button variant="success" type="submit" >Update</Button>
            </div>
          </Form>
          </div>
          <Row>
            <Col className="acc-btns mt-1">
              <Button size="md" variant="outline-danger" type="submit" ml="4" onClick={() => this.deleteUser()} >Delete Account</Button>
            </Col>
            
         </Row>
         
          <h3 className="favorite-Movies-title">Favorite Movies</h3>
        
        <Row className="favoriteMovied-col"> 
          { favorites && movies.map((movie) => (
           
            <Col sm={6} md={4} lg={4} key={movie._id}>
              <div className="favoriteMoviediv" >
                <MovieCard movie={movie} />
                
                <Button bg="danger" variant="danger" className="unfav-button" value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>
                  Delete From Favorites
                </Button>
                </div>
            </Col>
            
          ))
        }
         
        </Row>

     </Container>
    )
   }  
}
