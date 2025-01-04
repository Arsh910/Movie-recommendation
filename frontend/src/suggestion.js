import { useParams } from 'react-router-dom'
import {useState ,useEffect} from 'react';
import Hero from './hero';

function Sugestions({movie_name}){
  const [movies, setMovies] = useState([]);
  const [load , setload] = useState(true);
  const [error , seterror] = useState(false);
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/recommend/${movie_name}`)
          .then(response => response.json())
          .then(data => {
            setMovies(data['data']);
            setload(false);
          })
          .catch(error => seterror(true));

    },[movie_name])

    if(error){
      return(
        <Hero text="Sorry Can't recommend" />
      )
    }
    if(load){
      return(
        <Hero text="Loading...." />
      )
    }

    if(movies){
    return(
        <>
        {movies.map(movie => (
          <div className="card">
              
              {movie.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt="NO Poster Available" />
              ):(
              <img src={`https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=900`} className="card-img-top" alt="NO Poster Available"/>
              )
              }
              
              <div className="card-body">
                <h5 className="card-title">{movie.original_title}</h5>
                <p className="card-text">Movie Browser</p>
                  <a href={`/moview/${movie.id}`} className="btn btn-primary">Get Details</a>
              </div>
          </div>

        ))}
        </>
    )
  }
}
export default Sugestions