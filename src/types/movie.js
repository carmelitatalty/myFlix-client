import PropTypes from "prop-types";

export const MovieShape = PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired
    }).isRequired,
    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired
    }).isRequired
}).isRequired