import { useState } from "react";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { MovieCard } from "../movie-card/movie-card";
import { redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../../redux/reducers/user";
import { setFavorites } from "../../redux/reducers/favorite";
import { useEffect } from 'react';
import { setFavorites } from "../../redux/reducers/favorite";

export const ProfileView = () => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token.token);
  const favoriteMovies = useSelector((state) => state.favorite.favoriteMovies);

  const birthdate = new Date(user.Birthday);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(
    birthdate.toISOString().split("T")[0]
  );
  const [faveMovies, setFaveMovies] = useState([]);

  const dispatch = useDispatch();

  const handleUpdateUser = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: new Date(birthday),
    };
    fetch(
      `https://vast-coast-62638-64c47efe4f99.herokuapp.com/users/${username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        user.Username = username;
        user.Email = email;
        user.Birthday = new Date(birthdate).toISOString();
        dispatch(setUser(user));

        alert("Update successful");
        window.location.reload();
      } else {
        alert("Update failed");
      }
    });
  };

  const deregister = (event) => {
    event.preventDefault();
    fetch(
      `https://vast-coast-62638-64c47efe4f99.herokuapp.com/users/${username}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("Deregistration successful");
        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(setFavorites([]))
        redirect("/");
      } else {
        alert("Deregistration failed");
      }
    });
  };

  useEffect(() => {
    if (!movies || !favoriteMovies) {
      setFaveMovies([]);
      return;
    }

    let favorites = movies.filter((m) => favoriteMovies.includes(m._id));
    setFaveMovies(favorites);
  }, [favoriteMovies, movies]);

  return (
    <>
      <Form onSubmit={handleUpdateUser}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update User
        </Button>
      </Form>
      <>
        {faveMovies.map((movie) => (
          <Col key={movie._id} className="mb-5" md={3}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </>
      <Button type="button" onClick={deregister}>
        Deregister
      </Button>
    </>
  );
};
