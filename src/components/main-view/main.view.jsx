
import { useState } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    
  const [movies, setMovies] = useState([
    {
      "_id": { "$oid": "6577e180e528d5c99dbee728" },
      "Title": "The Lord of the Rings: The Fellowship of the Ring",
      "Description": "A magical ring with dark mythical powers is transported by a group of companions as the start of a quest to destroy the ring.",
      "Genre": { "Name": "Fantasy", "Description": "Fantastical events." },
      "Director": {
        "Name": "Peter Jackson",
        "Bio": "Known for directing fantasy movies adapted from books by JRR Tolkein and King Kong",
        "Birth": "1961"
      },
      "ImagePath": "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings%2C_TFOTR_%282001%29.jpg",
      "Featured": true
    },
    {
      "_id": { "$oid": "6577e180e528d5c99dbee729" },
      "Title": "The Lord of the Rings: The Two Towers",
      "Description": "The war vs evil begins.",
      "Genre": { "Name": "Fantasy", "Description": "Fantastical events." },
      "Director": {
        "Name": "Peter Jackson",
        "Bio": "Known for directing fantasy movies adapted from books by JRR Tolkein and King Kong",
        "Birth": "1961"
      },
      "ImagePath": "https://upload.wikimedia.org/wikipedia/en/f/fc/The_Lord_of_the_Rings%2C_T2T_%282002%29.jpg",
      "Featured": false
    },
    {
      "_id": { "$oid": "6577e180e528d5c99dbee72a" },
      "Title": "The Lord of the Rings: The Return of the King",
      "Description": "The ring is destroyed, saving Middle-Earth",
      "Genre": { "Name": "Fantasy", "Description": "Fantastical events." },
      "Director": {
        "Name": "Peter Jackson",
        "Bio": "Known for directing fantasy movies adapted from books by JRR Tolkein and King Kong",
        "Birth": "1961"
      },
      "ImagePath": "https://upload.wikimedia.org/wikipedia/en/2/23/The_Lord_of_the_Rings%2C_TROTK_%282003%29.jpg",
      "Featured": false
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null)

  if (selectedMovie) {
    return (
        <MovieView movie={selectedMovie} onBackClick={() => {setSelectedMovie(null)}} />
    )
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

    return (
        <div>
        {
            movies.map(movie => (
                <>
                <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie)
                }} />
                </>
            ))
        }
        </div>
    );
  };