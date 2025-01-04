import React from 'react'
import './App.css'
import './moview.css'
import { useParams } from 'react-router-dom'
import {useState ,useEffect} from 'react';
import Hero from './hero';
import Sugestions from './suggestion';

const Moview =()=>{
    const {id} =useParams()
    const[md , setmd]=useState('');
    
    //loading state 
    const [lo , setlo] = useState(true)

    //searching 
    useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=fdeb1f5338cf73b62cef521cd7c4c213&language=en-US`)
        .then(response => response.json())
        .then(data => {
          setTimeout(() => {
          setmd(data)
          setlo(false)
          },2000)
        })
    },[id])

    function removdet() {
      if(lo){
        return(
          <Hero text="Loading...." />
        )
      }
      if(md){
      return( 
      <>
      <Hero text={md.original_title} back={md.poster_path}/>
        <div className='poster'>
          <div className='image'><img alt='' style={{width:"100%"}}src={`https://image.tmdb.org/t/p/original${md.poster_path}`}/></div>
          <div className='to'>
          <div className='text'>{md.original_title}</div>
          <div className="detail">{md.overview}</div>
          </div>
        </div>
        <br/>
        <br/>
        <div>
          <Hero text="You may also Like" /> 
        </div>
        <Sugestions movie_name={md.original_title}/>
      </> 
        )
      }
    }

    return removdet()
}

export default Moview