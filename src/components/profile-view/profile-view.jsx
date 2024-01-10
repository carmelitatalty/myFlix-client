import { useState } from "react";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { MovieCard } from "../movie-card/movie-card";
import { redirect } from "react-router";

export const ProfileView = ({
  user,
  setUser,
  favoriteMovies,
  token,
  onLoggedOut,
}) => {
  const birthdate = new Date(user.Birthday);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(
    birthdate.toISOString().split("T")[0]
  );

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
        setUser(user);

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
        onLoggedOut();
        redirect("/");
      } else {
        alert("Deregistration failed");
      }
    });
  };

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
        {favoriteMovies.map((movie) => (
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
