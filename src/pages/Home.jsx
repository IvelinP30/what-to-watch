import Hero from "../components/Hero/Hero"
import TodaysMovie from "../components/TodaysMovie/TodaysMovie"

import { Box } from "@chakra-ui/react"

import { useEffect, useState } from "react"

import { getMovieOfTheDay, getRandomMovieHero } from "../services/movieService"


const Home = () => {
  const [movieOfTheDay, setMovieOfTheDay] = useState({})
  const [randomMovie, setRandomMovie] = useState({})
  
  

  useEffect(() => {
    const fetchMovieOfTheDay = async () => {
      const movie = await getMovieOfTheDay()
      setMovieOfTheDay(movie)
    }
    const fetchRandomMovie = async () => {
      const movie = await getRandomMovieHero()
      setRandomMovie(movie)
    }
    fetchMovieOfTheDay();
    fetchRandomMovie();
    
  }, [])
  return (

    <Box position='relative' overflow='hidden'>
      
      
      <Hero as='section' randomMovie={randomMovie}/>
      <TodaysMovie as='section' movieOfTheDay={movieOfTheDay}/>
    </Box>
  )
}

export default Home