import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
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
    </div>
  );
}

export default App;
