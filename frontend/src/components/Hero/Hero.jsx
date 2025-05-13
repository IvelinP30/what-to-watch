import { Text, Flex, Button, ButtonGroup } from "@chakra-ui/react"
import { heroContainer, heroTitleContainer, heroTitle, buttonStyles } from "./Hero.theme"
import { getRandomMovie } from "../../services/data"
import { useNavigate } from "react-router-dom"
import { useToast } from '@chakra-ui/react'

const Hero = ({ randomMovie }) => {
  const navigate = useNavigate();
  const toast = useToast()

  const goToRandomMovie = async () => {
    const randomMovieId = await getRandomMovie();

    if (randomMovieId.success !== false) {
      navigate(`/movie/details/${randomMovieId}`)
    } else {
      if (!toast.isActive('error')) {
        toast({
          id: 'error',
          title: 'There was an error.',
          description: "Try again later",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    }

  }

  return (
    <Flex
      background={randomMovie.success !== false ?

        `linear-gradient(
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.1)
        ),url(https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path})`
        :
        'secondary.100'
      }
      {...heroContainer}
    >
      <Flex {...heroTitleContainer}>
        <Text {...heroTitle} fontSize='5rem'>Trusted movie recommendations.</Text>
        <ButtonGroup gap='1rem'>
          <Button {...buttonStyles} onClick={() => { document.getElementById('todays-movie')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <Text zIndex='1' color='#fff'>Todays Movie</Text>
          </Button>
          <Button {...buttonStyles} onClick={() => goToRandomMovie()}>
            <Text zIndex='1' color='#fff'>Random Movie</Text>
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
}

export default Hero