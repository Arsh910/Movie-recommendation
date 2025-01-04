import './App.css'
import React from 'react';
import Hero from './hero';



const Movie =({res})=>{
  
var durl=`/moview/${res.id}`
console.log(res)
  return(
  <div className="card">
  {res.poster_path ? (
  <img src={`https://image.tmdb.org/t/p/w500${res.poster_path}`} className="card-img-top" alt="NO Poster Available" />
  ):(
  <img src={'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=900'} className="card-img-top" alt="NO Poster Available" />
  )
  }
  
  <div className="card-body">
    <h5 className="card-title">{res.original_title}</h5>
    <p className="card-text">Movie Browser</p>
      <a href={durl} className="btn btn-primary">Get Details</a>
  </div>
</div>
  )
}

const Seaview =({keywords,searchresults})=>{
const title = `you are searching for ... ${keywords}`
const results=searchresults.map((element, index)=>{  
    return(<Movie res ={element} />)
})
    return(
    <>
    <Hero text = {title} />
    {results}
    </>
    )
}
export default Seaview;