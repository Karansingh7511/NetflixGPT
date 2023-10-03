import React, { useEffect, useRef, useState } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { API_Options } from '../utils/constant'
import { addGptMovieResult } from '../utils/gptSlice'

const GptSearchBar = () => {
   
  const dispatch = useDispatch();
  const langkey = useSelector((store) => store.config.lang);

  const searchTxt = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // Start loading animation (e.g., show spinner)
    } else {
      // Stop loading animation (e.g., hide spinner)
    }
  }, [isLoading]);

  //search movie in tmdb

  const searchMovieTMDB = async (movie) =>  {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query="+
       movie +
       "&include_adult=false&language=en-US&page=1" ,
       API_Options
    );

    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {

    setIsLoading(true);

    const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query: " + 
       searchTxt.current.value + ". only give me names of 5 movies, comma seperated like example given ahead. Example result: gadar,sholey,Don,Golmaal,Koi mil gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    if(!gptResults.choices){
      //error handle
    }

    console.log(gptResults.choices?.[0]?.message?.content);

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(
      addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults})
    );
    
    setIsLoading(false); 
  
  };
  return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
      <form
        className='w-full md:w-1/2 bg-black rounded-lg  grid grid-cols-12 '
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchTxt}
          type='text'
          className='p-4 m-4 col-span-9 bg-gray-800 text-white rounded-lg border-2 border-blue-500 focus:outline-none focus:border-blue-700 placeholder-gray-500 placeholder-opacity-75 transition duration-300 ease-in-out'
          placeholder={lang[langkey].gptSearchPlaceholder}
        />
        <button
          className='col-span-3 m-4 py-2 px-4 border-2 border-blue-500 bg-gradient-to-r from-gray-700 to-gray-500 text-white rounded-lg flex items-center justify-center space-x-2 hover:from-gray-500 hover:to-gray-700 hover:text-white hover:shadow-md transition duration-300 ease-in-out text-xl'
          onClick={handleGptSearchClick}
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? (
            // Show loader while loading
            <div className="loader animate-spin w-5 h-5 border-t-2 border-blue-500 rounded-full"></div>
          ) : (
            // Show search text when not loading
            lang[langkey].search
          )}
        </button>
      </form>
    </div>
  );
}

export default GptSearchBar
