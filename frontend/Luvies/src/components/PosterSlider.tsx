import React, {useState, useEffect} from 'react';
import styles from './PosterSlider.module.css';

const TRENDING_MOVIES_API = 'http://localhost:8000/movies/trending'
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function PosterSlider() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            //send GET
            const response = await fetch(TRENDING_MOVIES_API);

            //Parse JSON response
            const movies = await response.json();

            setMovies(movies.data.movies);
        }

        fetchMovies();
    }, []);
    console.log("test")
    return (
        <div className={styles.posterSlider}>
            <h1>Movies Posters</h1>
            <ul>
                {movies.map((movie: any) => (
                    <li key={movie.id}>
                        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PosterSlider;