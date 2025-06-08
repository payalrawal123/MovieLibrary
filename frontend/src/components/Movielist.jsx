import React, { useEffect } from 'react';

let url = 'https://www.omdbapi.com/?s=kabhi&apikey=bd65d91';

const Movielist = () => {
  const [movie, setMovie] = useState([]);
 
   useEffect(() => {
     fetchMovie();
   }, []);
 
   const fetchMovie = async () => {
     try {
       let res = await fetch(url);
       let data = await res.json();
       setMovie(data.Search);
       console.log(data.Search); // Correctly accessing the 'Search' property
     } catch (error) {
       console.log(error);
     }
   };
 
   return (
     <>
       <div>
         {movie.map((item) => (
           <div key={item.imdbID}> {/* Wrap <p> and <img> in a container */}
             <p>{item.Title}</p>
             <img src={item.Poster} alt={`${item.Title} Poster`} /> {/* Use item.Poster for the image */}
           </div>
         ))}
          <div className='row'>
                <MovieList movies={movies} favouriteComponent={AddFavourites} />
            </div>
       </div>
     </>
   )
};

export default Movielist;
