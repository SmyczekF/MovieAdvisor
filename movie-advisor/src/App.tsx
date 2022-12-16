import { useState, useEffect } from "react";
import Axios from "axios";

function App() {

  const [movieList, setMovieList] = useState([])
  
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data);
    })
  }, [])

  return (
    <div className="App">
      <h1>CRUD APP</h1> 
      <div className="form">
        <label htmlFor="movieName">Movie name:</label>
        <input type="text" name="movieName"/>
        <label htmlFor="review">Rewiev:</label>
        <input type="text" name="review"/>

        <button>Submit</button>

        {movieList.map((val:any) => {
          return (
          <div>
            <h1>TYTUŁ: {val.TITLE}</h1>
            <h2>JĘZYK: {val.MOVIE_LANGUAGE}</h2>
            <h2>DUBBING: {val.DUBBING}</h2>
            <h2>NAPISY: {val.SUBTITLES}</h2>
            <h2>GATUNEK: {val.GENRE}</h2>
            <h2>OBSADA: {val.MOVIE_CAST}</h2>
            <h2>REŻYSER: {val.MOVIE_DIRECTOR}</h2>
            <h2>DATA: {val.MOVIE_DATE}</h2>
            <h2>DŁUGOŚĆ: {val.MOVIE_LENGTH}min</h2>
            <h2>WIEK: {val.VIEWER_AGE}+</h2>
            <h2>KRAJ PRODUKCJI: {val.PRODUCTION_COUNTRY}</h2>
            <h2>ROK PRODUKCJI: {val.PRODUCTION_YEAR}</h2>
            <h2>OPIS: {val.MOVIE_DESCRIPTION}</h2>
          </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
