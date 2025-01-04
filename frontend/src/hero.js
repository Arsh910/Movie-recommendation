import "./App.css";
import React from 'react';

//props are used this way in functional components 

const Hero=({text,back})=>{
    var url=`https://image.tmdb.org/t/p/original${back}`  
    return(
    <h1 className="hero" style={{backgroundImage:`url(${url})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>{text}</h1>
    )
 }

export default Hero;