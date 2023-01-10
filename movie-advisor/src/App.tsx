import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Axios from "axios";

function App() {

  // const [movieList, setMovieList] = useState([])
  
  // useEffect(() => {
  //   Axios.get("http://localhost:3001/api/get").then((response) => {
  //     setMovieList(response.data);
  //   })
  // }, [])

  //test

  return (
    <div className="App">
      <Navbar></Navbar>
      <Hero></Hero>
    </div>
  );
}

export default App;
