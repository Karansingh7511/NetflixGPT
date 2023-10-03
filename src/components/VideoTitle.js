import React from "react";
import { AiFillInfoCircle } from "react-icons/ai";

const VideoTitle = ({title , overview}) => {
  return (
    <div className=" absolute w-screen aspect-video py-[20%] sm:px-20 px-4 bg-gradient-to-r from-black text-white">
      <h1 className="sm:text-4xl text-xl font-bold">{title}</h1>
      <p className="sm:w-[500px] w-[200px] line-clamp-2 sm:line-clamp-3 mt-3">{overview}</p>
      <div className="flex justify-start mt-4 ">
        <button className=" bg-white px-2 py-1 rounded-sm text-black font-medium flex items-center hover:opacity-80">
          <img
            className="h-4 w-4"
            src="https://cdn.iconscout.com/icon/free/png-512/free-play-player-arrow-stop-sound-30544.png?f=avif&w=512"
            alt="play"
          />
          Play Now
        </button>
        <button className=" bg-gray-700 px-2 py-1 ml-4 rounded-sm text-white font-medium flex items-center hover:opacity-80 ">
        <AiFillInfoCircle className="mr-1"/>
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;