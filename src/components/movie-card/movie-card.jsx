import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { MovieShape } from "../../types/movie";
import { Link } from "react-router-dom";

export const MovieCard = ({movie}) => {
    return (<>
    <Card className="h-100">
        <Card.Img variant="top" src={movie.ImagePath} className="cardImage" />
        <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Director.Name}</Card.Text>
            <Link to={`/movies/${encodeURIComponent(movie._id)}`} >
                <Button variant='link'>
                    Open
                </Button>
            </Link>
        </Card.Body>
    </Card>
    </>)
}

MovieCard.propTypes = {
    movie: MovieShape
}