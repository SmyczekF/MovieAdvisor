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
      {movieList.map((val:any) => {
        return (
        <div className="movie-card">
          <h1>TYTUŁ: {val.TITLE}</h1>
          <h2>JĘZYK: {val.MOVIE_LANGUAGE}</h2>
          <h2>DUBBING: {val.DUBBING}</h2>
          <h2>NAPISY: {val.SUBTITLES}</h2>
          <h2>TYP FILMU: {val.MOVIE_TYPE}</h2>
          <h2>GATUNEK: {val.GENRE}</h2>
          <h2>OBSADA: {val.MOVIE_CAST}</h2>
          <h2>REŻYSER: {val.MOVIE_DIRECTOR}</h2>
          <h2>DATA: {val.MOVIE_DATE}</h2>
          <h2>DŁUGOŚĆ: {val.MOVIE_LENGTH}min</h2>
          <h2>WIEK: {val.VIEWER_AGE}+</h2>
          <h2>OPIS: {val.MOVIE_DESCRIPTION}</h2>
          <h2>MIASTO KINA: {val.CITY}</h2>
          <h2>PREMIERA: {val.PREMIERE}</h2>
        </div>
        )
      })}
    </div>
  );
}

export default App;
