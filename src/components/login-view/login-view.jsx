import { useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/reducers/user";
import { setToken } from '../../redux/reducers/token';
import { setFavorites } from '../../redux/reducers/favorite';

export const LoginView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();
    
        const data = {
          Username: username,
          Password: password
        };
    
        fetch(`https://vast-coast-62638-64c47efe4f99.herokuapp.com/login`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('token', data.token)
                dispatch(setUser(data.user))
                dispatch(setToken(data.token))
                dispatch(setFavorites(data.user.FavoriteMovies?data.user.FavoriteMovies : []))
            } else {
                alert('No such user.')
            }
        }).catch((e) => {
            alert('Something went wrong')
        });
      };

    return (
        <Form onSubmit={handleSubmit}>
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
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
  };