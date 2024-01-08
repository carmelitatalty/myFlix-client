
import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar"
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
    
  const [movies, setMovies] = useState([]);
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

  const onLoggedOut = () => {
      setUser(null);
      setToken(null)
      localStorage.clear()
      setMovies([])
  }

  return (
    <BrowserRouter>
        <NavigationBar user={user} onLoggedOut={onLoggedOut}></NavigationBar>
        <Row className="justify-content-md-center">
            <Routes>
                <Route path="/signup"
                    element={<>
                    {user ? (
                        <Navigate to="/" />
                    ) : (
                        <Col md={5}>
                            <SignupView />
                        </Col>
                    )}
                    </>}
                ></Route>
                <Route path="/login"
                    element={<>
                        {user ? (
                        <Navigate to="/" />
                        ) : (
                        <Col md={5}>
                            <LoginView onLoggedIn={(user, token) => {
                                setUser(user)
                                setToken(token)
                            }} />
                        </Col>
                        )}
                    </>}>

                </Route>
                <Route path="/movies/:movieId"
                    element={<>
                        {!user ? (
                        <Navigate to="/login" replace />
                        ) : movies.length === 0 ? (
                        <Col>The list is empty!</Col>
                        ) : (
                        <Col md={8}>
                            <MovieView  movies={movies} />
                        </Col>
                        )}
                    </>}
                ></Route>
                <Route path="/"
                    element={<>
                        {!user ? (
                        <Navigate to="/login" replace />
                        ) : movies.length === 0 ? (
                        <Col>The list is empty!</Col>
                        ) : (
                        <>
                        {
                            movies.map((movie) => (
                                <Col key={movie._id} className="mb-5" md={3}>
                                    <MovieCard movie={movie} />
                                </Col>
                            ))
                        }
                        </>
                        )}
                    </>}></Route>
            </Routes>
        </Row>
    </BrowserRouter>
  )
  };