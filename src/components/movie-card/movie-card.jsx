import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { MovieShape } from "../../types/movie";

export const MovieCard = ({movie, onMovieClick}) => {
    return (<>
    <Card className="h-100">
        <Card.Img variant="top" src={movie.ImagePath} className="cardImage" />
        <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Director.Name}</Card.Text>
            <Button onClick={() => {
                onMovieClick(movie);
            }}>
                Open
            </Button>
        </Card.Body>
    </Card>
    </>)
}

MovieCard.propTypes = {
    movie: MovieShape,
    onMovieClick: PropTypes.func.isRequired
}