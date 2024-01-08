import PropTypes from "prop-types";
import { MovieShape } from "../../types/movie";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({movies}) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);
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
        <Link to={`/`}>
            <Button className="back-button">Back</Button>
        </Link>
    </ div>
    )
}

MovieView.propTypes = {
    movies: PropTypes.arrayOf(MovieShape).isRequired
}