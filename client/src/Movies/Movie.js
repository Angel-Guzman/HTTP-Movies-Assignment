import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const deleteMovie = e => {
    e.preventDefault();
    axios
    .delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(res => {
      console.log(res)
      const newList = movieList.filter(movie => movie.id !== res.data)
      setMovieList(newList)
      push(`/`)
    })
    .catch(err => console.log(err))
  }
  
  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={() => push(`/update-movie/${movie.id}`)} >
        Update Movie
      </div>
      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>
      <div className="edit-button" onClick={saveMovie}>
        Save
      </div>
      
    </div>
  );
}

export default Movie;
