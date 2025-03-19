import { Card, Image, Stack, CardBody, Heading, Text, Button, Box, Flex } from "@chakra-ui/react"
import {
  todaysMovieContainer,
  todaysMovieTitle,
  card,
  cardImage,
  cardContentContainer,
  cardTitle,
  cardText,
  cardRating,
  featureInfoContainer,
  buttonStyles
} from "./TodaysMovie.theme"
import { useNavigate } from "react-router-dom"

const TodaysMovie = ({ movieOfTheDay }) => {

  const navigate = useNavigate();

  const goToTodaysMovieDetails = async () => {
      navigate(`/movie/details/${movieOfTheDay.id}`)
  }

  return (

    <Box as='section' {...todaysMovieContainer} position='relative' overflow='hidden'>
            <Box
            position='absolute'
            bottom='-60%'
            left='-10%'
            backgroundColor='main.200'
            borderRadius='30% 70% 70% 30% / 30% 60% 70% 70% '
            width='100%'
            height='100%'
            zIndex='0'
          />
      <Text as='h2' id='todays-movie' {...todaysMovieTitle}>Movie of the day</Text>
      {movieOfTheDay.success !== false ?
        <Card
          variant='elevated'
          {...card}
        >

          <Box
            position='absolute'
            top='-30%'
            right='-10%'
            backgroundColor='secondary.200'
            borderRadius='30% 70% 70% 30% / 30% 60% 70% 70% '
            width='100%'
            height='100%'
            zIndex='0'
          />

          <Image
            src={`https://image.tmdb.org/t/p/original/${movieOfTheDay?.backdrop_path}`}
            alt='Movie Banner'
            {...cardImage}
            zIndex='100'
          />

          <Stack {...cardContentContainer}>
            <CardBody zIndex='100'>
              <Heading  {...cardTitle}>{movieOfTheDay?.title}</Heading>

              <Text {...cardText}>{movieOfTheDay?.overview}</Text>
              <Button {...buttonStyles}  onClick={() => goToTodaysMovieDetails()}>
                <Text zIndex='1' color='#fff'>Learn More</Text>
              </Button>
              <Text {...cardRating}>{movieOfTheDay?.vote_average?.toFixed(1)}</Text>
            </CardBody>
          </Stack>

        </Card>

        :
        <Text as='p' color='#fff' textAlign='center' fontSize='lg'>We are still looking for the best movie for today. Please come back later.</Text>
      }
      <Flex {...featureInfoContainer}>

        <Box marginBottom='3rem' zIndex='100'>
          <Text as='h3' fontSize='4xl' fontWeight='bold' marginBottom='10px'>Discover a New Movie Every Day!</Text>
          <Text as='p' fontSize='lg'>Experience the best in handpicked trending movies curated by our team, with a new selection waiting for you each day.</Text>
        </Box>
        <Box zIndex='100'>
          <Text as='h3' fontSize='4xl' fontWeight='bold' marginBottom='10px'>Our Selection Process!</Text>
          <Text as='p' fontSize='lg'>Our team meticulously curates each days movie choice, ensuring that you get the best in trending cinema, thoughtfully selected for your viewing pleasure.</Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default TodaysMovie