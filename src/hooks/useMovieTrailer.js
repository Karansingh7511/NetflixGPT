import React, { useEffect } from 'react';
import { API_Options } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';

const useMovieTrailer = ( movieId ) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector(store => store.movies.trailerVideo);
  // Fetch trailer video
  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_Options
      );
      const json = await data.json();

      // Check if json.results is defined and is an array before filtering
      if (json.results && Array.isArray(json.results)) {
        const filterData = json.results.filter((video) => video.type === 'Trailer');
        const trailer = filterData.length ? filterData[0] : json.results[0];
      
        dispatch(addTrailerVideo(trailer));
      } else {
        console.error('Invalid API response format:', json);
      }
    } catch (error) {
      console.error('Error fetching movie videos:', error);
    }
  };

  useEffect(() => {
  !trailerVideo && getMovieVideos();
  }, []);

  return null; // Return null or desired JSX here
};

export default useMovieTrailer;
