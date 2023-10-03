import React, { useEffect } from 'react'
import { API_Options } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { addTopRatedMovies } from '../utils/moviesSlice'
import { useSelector } from 'react-redux'

const useTopRatedMovies = () => {

const dispatch = useDispatch();
const topRatedMovies = useSelector(store => store.movies.topRatedMovies);

  const getTopRatedMovies = async () => {
     const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_Options);
     const json = await data.json();
    
     dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
   !topRatedMovies &&  getTopRatedMovies();
  }, []);

}

export default useTopRatedMovies;