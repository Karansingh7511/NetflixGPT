import React, { useEffect } from 'react'
import { API_Options } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { addPopularMovies } from '../utils/moviesSlice'
import { useSelector } from 'react-redux'

const usePopularMovies = () => {

  const dispatch = useDispatch();

  const popularMovies = useSelector(store => store.movies.popularMovies);

  const getPopularMovies = async () => {
     const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_Options);
     const json = await data.json();
    
     dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
   !popularMovies &&  getPopularMovies();
  }, []);

}

export default usePopularMovies;