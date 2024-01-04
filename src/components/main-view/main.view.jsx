
import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

export const MainView = () => {
    
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
    
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  

  useEffect(() => {
    if (!token) {
        return;
      }

    fetch('https://vast-coast-62638-64c47efe4f99.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
        .then((response) => response.json())
        .then((data) => {
            setMovies(data)
        })
  }, [token])
  
  const logout = (<>
    <Button onClick={() => { 
        setUser(null);
        setToken(null)
        localStorage.clear()
        setMovies([])
        setSelectedMovie(null)
        }}>Logout</Button>
    </>)

  return (
    <Row className="justify-content-md-center">
        {!user ? (
    <>
        <Col md={5}>
        <LoginView onLoggedIn={(user, token) => {
            setUser(user)
            setToken(token)
        }} />
        or
        <SignupView></SignupView>
        </Col>
    </>) : selectedMovie ? (
        <>
        <Col md={8}>
            <MovieView 
            movie={selectedMovie} 
            onBackClick={() => {setSelectedMovie(null)}} />
        </Col>
        {logout}
        
        </>
    ) : movies.length === 0 ? (
        <>The list is empty!{logout}</>
    ): (
        <>
        {
            movies.map((movie) => (
                <Col key={movie._id} className="mb-5" md={3}>
                    <MovieCard movie={movie} onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie)
                    }} />
                </Col>
            ))
        }
        {logout}
        </>
    )}
    </Row>
  )
  };