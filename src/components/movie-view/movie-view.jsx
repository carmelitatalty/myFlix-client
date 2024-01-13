import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { addFavorite, removeFavorite } from "../../redux/reducers/favorite";


export const MovieView = () => {
  const movies = useSelector ((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token.token);
  const favoriteMovies = useSelector((state) => state.favorite.favoriteMovies);

  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  const [isFavorite, setIsFavorite] = useState(false);
  
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFavorite(favoriteMovies.includes(movie._id))
  },
  [favoriteMovies, favoriteMovies.length]);

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
        dispatch(addFavorite(movie._id))
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
      dispatch(removeFavorite(movie._id))
    });
  };

  return (
    <div>
      <div>
        <Image src={movie.ImagePath} className="img-fluid" />
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
