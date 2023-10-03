import React, { useEffect } from 'react'
import { API_Options } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addNowPlayingMovies } from '../utils/moviesSlice'

const useNowPLayingMovies = () => {

  const dispatch = useDispatch();
  
  const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);
  const getNowPlayingMovies = async () => {
     const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_Options);
     const json = await data.json();
    
     dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
   !nowPlayingMovies &&  getNowPlayingMovies();
  }, []);

}

export default useNowPLayingMovies;