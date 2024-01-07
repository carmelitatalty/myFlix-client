import PropTypes from "prop-types";
import { MovieShape } from "../../types/movie";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';

export const MovieView = ({movie, onBackClick}) => {
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
        <Button onClick={onBackClick}>Back</Button>
    </ div>
    )
}

MovieView.propTypes = {
    movie: MovieShape,
    onBackClick: PropTypes.func.isRequired
}