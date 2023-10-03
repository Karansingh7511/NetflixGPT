import React from 'react'
import { IMG_CDN_URL } from '../utils/constant'

const MovieCard = ({posterPath}) => {
 
  if(!posterPath) return null;

  return (
    <div className='w-36 md:w-48 pr-4 hover:scale-110 hover:transition-all duration-300 ease-in-out'>
      <img alt='moviecard' src={IMG_CDN_URL + posterPath} />
    </div>
  )
}

export default MovieCard
