import axios from 'axios';
import { useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

axios.defaults.baseURL = `http://www.omdbapi.com?apikey=${process.env.REACT_APP_API_KEY}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async(title) => {
        const response = await axios.get('', {params: {
            s: title
        }})
        setMovies(response.data.Search);
    }

    return (
        <div className="app">
            <h1>React Movie App</h1>

            <div className="search">
                <input placeholder="Search for Movies" onChange={(e) => {setSearchTerm(e.target.value)}} />
                <img src={SearchIcon} alt="search" onClick={() => {searchMovies(searchTerm)}} />
            </div>

            { movies?.length > 0 ? (
                <div className="container">
                    { movies.map(movie => (
                     <MovieCard movie={movie}></MovieCard>
                    )) }
                </div>
                ) : <div className="empty"><h2>No Movies Found</h2></div>
            }
        </div>
    )
}

export default App;
