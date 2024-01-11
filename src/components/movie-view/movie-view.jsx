import PropTypes from "prop-types";
import { MovieShape } from "../../types/movie";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"

export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(user.FavoriteMovies.includes(movie._id))
  },
  [user, user.FavoriteMovies, user.FavoriteMovies.length]);

  const handleAddFavorite = () => {
    fetch(
      `https://vast-coast-62638-64c47efe4f99.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        user.FavoriteMovies.push(movie._id);
        setUser(user)
      })
      .catch((e) => {
        alert("Error adding favoirte");
      });
  };

  const handleRemoveFavorite = () => {
    fetch(
      `https://vast-coast-62638-64c47efe4f99.herokuapp.com/user/favorites/${user.Username}/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then(() => {
      const index = user.FavoriteMovies.indexOf(movie._id);
      if (index > -1) {
        user.FavoriteMovies.splice(index, 1);
        setUser(user)
      }
    });
  };

  return (
    <div>
      <div>
        <Image src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>

      {isFavorite ? (
        <>
          <Button onClick={handleRemoveFavorite}>Unfavorite</Button>
        </>
      ) : (
        <>
          <Button onClick={handleAddFavorite}>Make Favorite</Button>
        </>
      )}

      <Link to={`/`}>
        <Button className="back-button">Back</Button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(MovieShape).isRequired,
};
