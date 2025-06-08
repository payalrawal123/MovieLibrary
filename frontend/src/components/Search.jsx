import React from 'react'

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
   const getMovieRequest = async () => {
        const url = `http://www.omdbapi.com/?s=star wars&apikey=263d22d8`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    };
  return (
    <div>
       <div className='col col-sm-4'>
            <input
                className='form-control'
                value={value}
                onChange={getMovieRequest}
                placeholder='Type to search...'
            ></input>
        </div>
    </div>
  )
}

export default Search
