import React, { useState } from 'react'

const App = () => {
  const [movie, setMovie] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async() => {
   try{
      const res = await fetch(`https://www.omdbapi.com/?t=${movie}&apikey=6faa1a94`);
      const result = await res.json();
      console.log(result);

      if(result.Response === "True"){
        setData(result);
        setError('');
      }
      else{
        setData(null);
        setError("Movie not found");
      }
   }
   catch(err){
      setError("Something went wrong !")
   }
  }

  return (
    <div className='container'>
      <h2>Movie Search App</h2>
      <div className="box">
        <input type="text" placeholder='Enter movie name...' value={movie} onChange={(e) => setMovie(e.target.value)} />
        <button onClick={fetchData}>Search</button>
      </div>
      {
        data && (
        <div className="movie">
        <h3>Title : <span>{data.Title} ({data.Year})</span> </h3>
        <img src={data.Poster} alt={data.Title}/>
        <p className='rating'>Rating : <span>{data.imdbRating}</span></p>
        <p className='description'>Short Description : <span>{data.Plot}</span> </p>
      </div>
        )
      }
      {error && (
        <p>{error}</p>
      )}
    </div>
  )
}

export default App;