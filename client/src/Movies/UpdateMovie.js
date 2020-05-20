import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const UpdateMovie = props => {
    return (
        <div>
            <h2>Update Movie</h2>
            <form>
                <input type='text' /><br />
                <input type='text' />
            </form>
        </div>
    )
}

export default UpdateMovie;