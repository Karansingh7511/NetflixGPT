import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constant'

const gptSearch = () => {
  return (
    <div>
       <>
       <div className='fixed -z-10 w-screen'>
          <img className=' h-screen object-cover w-full' src={BG_URL} alt='backgroundimage'/>
         </div>

        <div className=''>
        <GptSearchBar/>
        <GptMovieSuggestions />
        </div>
       </>
        
      
    </div>
  )
}

export default gptSearch