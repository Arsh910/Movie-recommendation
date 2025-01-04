import { useParams } from 'react-router-dom'
import {useState ,useEffect} from 'react';
import Hero from './hero';
function Page(){
    const[movies , setmd]=useState('');
    
    const totalPages = 10; // Set a reasonable limit based on the total number of pages in the TMDb API.

    function getRandomPage() {
    return Math.floor(Math.random() * totalPages) + 1;
    }

    //loading state 
    const [lo , setlo] = useState(true)

    //searching 
    useEffect(()=>{
      const randomPage = getRandomPage();
      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=fdeb1f5338cf73b62cef521cd7c4c213&language=en-US&page=${randomPage}`)
        .then(response => response.json())
        .then(data => {
          setmd(data['results'])
          console.log(data)
          setlo(false)
        })
    },[])

    if(lo){
        return(
          <Hero text="Loading...." />
        )
    }
    if(movies){
    return(
        <>
        <Hero  text='Your place for movies'/>
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
export default Page