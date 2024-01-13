import { useState, useEffect } from "react";

import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { MovieList } from "../movie-list/movie-list";

export const MainView = () => {
  const movies = useSelector((state) => state.movies.list);
  const token = useSelector((state) => state.token.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://vast-coast-62638-64c47efe4f99.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setMovies(data));
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar></NavigationBar>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {token ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <>
                {token ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView />
                  </Col>
                )}
              </>
            }
          ></Route>
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!token ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView />
                  </Col>
                )}
              </>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <>
                {!token ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView></ProfileView>
                  </Col>
                )}
              </>
            }
          ></Route>
          <Route
            path="/"
            element={
              <>
                {!token || !movies ? (
                  <Navigate to="/login" replace />
                ) : <MovieList></MovieList>}
              </>
            }
          ></Route>
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
