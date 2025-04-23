import Hero from "../components/Hero/Hero"
import TodaysMovie from "../components/TodaysMovie/TodaysMovie"
import FeatureInfoContainer from "../components/FeatureInfo/FeatureInfoContainer"
import TrendingContainer from "../components/Trending/TrendingContainer"

import { Box } from "@chakra-ui/react"

import { useEffect, useState } from "react"

import { getMovieOfTheDay, getRandomMovieHero } from "../services/data"

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
      <Hero as='section' randomMovie={randomMovie} />
      <Box as='section' paddingBottom='3rem' paddingTop='2rem' backgroundColor='main.100' boxShadow='1px -50px 122px 100px rgba(205,53,54,1)' position='relative' overflow='hidden' zIndex="0">
        <Box padding='2rem' >
          <TodaysMovie as='section' movieOfTheDay={movieOfTheDay} />
        </Box>
        <TrendingContainer width="100%" />
        <FeatureInfoContainer />
      </Box>
    </Box>
  )
}

export default Home