import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ['', '', '']
}

const UpdateMovie = props => {

    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie)
    const { id } = useParams();


    useEffect(() => {
        const updatedMovie = props.movieList.find(movie => movie.id == id)
        if (updatedMovie){
            // console.log(updatedMovie)
            setMovie(updatedMovie)
        }
    }, [id])

    const handleChanges = e => {
        e.persist()
        let formValue = e.target.value
        if(e.target.name === 'metascore') {
            formValue = parseInt(formValue, 10)
        }

        if(e.target.name === 'stars') {
            formValue = formValue.split(',')
        }

        setMovie({
            ...movie,
            [e.target.name]: formValue
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            console.log(res)
            // update movieList with new movie
            // navigate to updated movie
            const newList = props.movieList.map(movie => {
                if (movie.id == res.data.id) {
                    return res.data
                }
                return movie
            })
            props.setMovieList(newList)
            push(`/movies/${movie.id}`)
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <label> Title:<br />
                    <input 
                    type='text' 
                    name='title'
                    value={movie.title}
                    onChange={handleChanges}
                    />
                </label><br />
                <label> Director:<br />
                    <input 
                    type='text' 
                    name='director'
                    value={movie.director}
                    onChange={handleChanges}
                    /><br />
                </label> 
                <label> Metascore:<br />
                    <input 
                    type='text' 
                    name='metascore'
                    value={movie.metascore}
                    onChange={handleChanges}
                    /><br />
                </label>
                <label> Stars:<br />
                {movie.stars.map(star => {
                    return (
                        <input 
                        type='text' 
                        name='stars'
                        id='stars'
                        value={star}
                        onChange={handleChanges}
                        />
                    )
                })}
                </label>
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;