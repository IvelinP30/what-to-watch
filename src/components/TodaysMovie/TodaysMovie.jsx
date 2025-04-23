import { Card, Image, Stack, CardBody, Heading, Text, Button, Box } from "@chakra-ui/react"
import {
  todaysMovieTitle,
  card,
  cardImage,
  cardContentContainer,
  cardTitle,
  cardText,
  cardRating,
  buttonStyles
} from "./TodaysMovie.theme"
import { useNavigate } from "react-router-dom"

const TodaysMovie = ({ movieOfTheDay }) => {

  const navigate = useNavigate();

  const goToTodaysMovieDetails = async () => {
    navigate(`/movie/details/${movieOfTheDay.id}`)
  }

  return (

    <Box as='section'>
      <Box
        position='absolute'
        bottom='-60%'
        left='-10%'
        backgroundColor='main.200'
        borderRadius='30% 70% 70% 30% / 30% 60% 70% 70% '
        width='100%'
        height='100%'
        zIndex='-1'
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
              <Button {...buttonStyles} onClick={() => goToTodaysMovieDetails()}>
                <Text zIndex='1' color='#fff'>Learn More</Text>
              </Button>
              <Text {...cardRating}>{movieOfTheDay?.vote_average?.toFixed(1)}</Text>
            </CardBody>
          </Stack>

        </Card>

        :
        <Text as='p' color='#fff' textAlign='center' fontSize='lg'>We are still looking for the best movie for today. Please come back later.</Text>
      }
    </Box>
  )
}

export default TodaysMovie