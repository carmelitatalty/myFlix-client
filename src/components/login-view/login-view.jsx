import { useState } from 'react'

export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                onLoggedIn(data.user.Username, data.token)
            } else {
                alert('No such user.')
            }
        }).catch((e) => {
            alert('Something went wrong')
        });
      };

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={5}
           />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };