import './App.css';
import {useState ,useEffect} from 'react';
import Navbar from './navbar';
import MB from './mb';
import Home from './home';
import About from './about';
import Seaview from './seaview'
import {Routes,Route} from 'react-router-dom';
import Moview from './moview';
import Hero from './hero';
import Page from './page';
// import Moview from './moview';

//tbi key =fdeb1f5338cf73b62cef521cd7c4c213
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer fdeb1f5338cf73b62cef521cd7c4c213'
//   }
// };

// fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

function App() {
//     const[ sr , setsr]= useState(0/*current state*/);//we don't have this.state in function based components so we use a hook called userState
//     function update() {
//     setsr(sr+1) //only this function can update this value
//   }

//useEffect
    // take two attributes function and
    //it runs when website starts
    //it runs every time state is updated
    //if you don,t want this to run with change in state ,then use second attribute 
  
  // const[ st , setst]= useState("hello"); 
  //   useEffect(()=>{
  //   console.log("hellw world");
  // },[st])
  // function updatet() {
  //   setst("world") //only this function can update this value
  // } 
  
  //bootcamp
  const[sr , setsr]=useState([]);
  const[st , setst]=useState('');
 
  //searching  
  useEffect(()=>{
    console.log(st,"is search text");
    
    fetch(`https://api.themoviedb.org/3/search/movie?query=${st}&api_key=fdeb1f5338cf73b62cef521cd7c4c213`)
      .then(response => response.json())
      .then(data => {
        setsr(data.results);    
      })

    //kalob
    // fetch('https://api.themoviedb.org/3/search/movie?api_key=ab166ff82684910ae3565621aea04d62&language=en-US&query=${searchText&page=1&include_adult=false')
    // .then(response=>response.json())
    // .then(data=>{console.log(data)})


  },[st])
  
  
  return (
    
    <div className="App">
      <div id='topoo'></div>
      {/* nav bar component */}
      <Navbar search ={st} searchresults={setst}/>

      {/* home component */}
      {/* <Home /> */}

      {/* adding about component */}
      {/* <About /> */}
      
      {/* installing react router */}
      {/* activating router browser index.js*/}
      {/* check in pakage.json file */}
      {/*npm install react-router-dom */}
      
    <Routes> 
    {/* Switch is replaced by Routes and Routes must contain Route Component only So only this syntax*/}
    
    {/* adding mutiple elemets */}
    {/* <Route path="/app" element={(<div><Home /><About /></div>)} /> */}
    <Route path="/app" Component={MB}/>

    {/* components can be single only */}
    <Route path='' element={<Page/>} back={sr}/>
    <Route path ="/home" Component={ Home}/>
    <Route path ="/about" exact Component={ About} />
    <Route path="/seaview" element={<Seaview keywords={st} searchresults={sr}/>}/>
    <Route path="/moview/:id" Component={ Moview} />
    </Routes>

    {/* hooks */}
    {/* <h3>button clicked {sr} times</h3>
    <button on onClick={()=>{update()}}> click this to change state</button>
    <h3>this is {st}</h3>
    <button on onClick={()=>{updatet()}}> click this to use effect</button>*/}
    
    {/* bootcamp */}
    
    </div> 

  );
}

export default App;
