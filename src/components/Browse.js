import useNowPLayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovies from "../hooks/usePopularMovies";
import Header from "./Header"
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./gptSearch";
import { useSelector } from "react-redux";

const Browse = () => {

  const showGptSearch = useSelector((store => store.gpt.showGptSearch));

  useNowPLayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
        <Header />
        {showGptSearch ? (
          <GptSearch />
        ) : (
          <>
          <MainContainer />
        <SecondaryContainer />
          </>
        )}
       
        
    </div>
  )
}

export default Browse
