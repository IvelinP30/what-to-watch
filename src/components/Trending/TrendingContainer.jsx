import { Box, Flex, Heading, Text, Button, ButtonGroup } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { chakra } from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"

import { getTrendingItems } from "../../services/data"
import ShowMovieCard from "./ShowMovieCard"
import PersonCard from "./PersonCard"

import {
    trendingTitle,
    listStyles,
} from "./Trending.theme"

const MotionBox = motion(chakra.div)
const MotionDiv = motion.div

const TrendingContainer = () => {
    const [trendingMovies, setTrendingMovies] = useState({ results: [] })
    const [trendingShows, setTrendingShows] = useState({ results: [] })
    const [trendingPeople, setTrendingPeople] = useState({ results: [] })

    const [hoveredMovie, setHoveredMovie] = useState(null)
    const [hoveredShow, setHoveredShow] = useState(null)
    const [hoveredPerson, setHoveredPerson] = useState(null)

    const [loading, setLoading] = useState(true)

    const [movieTimeWindow, setMovieTimeWindow] = useState("day")
    const [tvTimeWindow, setTvTimeWindow] = useState("day")
    const [personTimeWindow, setPersonTimeWindow] = useState("day")

    useEffect(() => {
        fetchTrendingMovies("day")
        fetchTrendingShows("day")
        fetchTrendingPeople("day")
    }, [])

    const fetchTrendingMovies = async (timeWindow) => {
        setLoading(true)
        try {
            const movies = await getTrendingItems('movie', timeWindow)
            setTrendingMovies(movies)
            setHoveredMovie(movies.results?.[0])
            setMovieTimeWindow(timeWindow)
        } catch (error) {
            console.error("Error fetching movies:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchTrendingShows = async (timeWindow) => {
        setLoading(true)
        try {
            const shows = await getTrendingItems('tv', timeWindow)
            setTrendingShows(shows)
            setHoveredShow(shows.results?.[0])
            setTvTimeWindow(timeWindow)
        } catch (error) {
            console.error("Error fetching shows:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchTrendingPeople = async (timeWindow) => {
        setLoading(true)
        try {
            const people = await getTrendingItems('person', timeWindow)
            setTrendingPeople(people)
            setHoveredPerson(people.results?.[0])
            setPersonTimeWindow(timeWindow)
        } catch (error) {
            console.error("Error fetching people:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!hoveredMovie && trendingMovies?.results?.length) {
            setHoveredMovie(trendingMovies.results[0])
        }
        if (!hoveredShow && trendingShows?.results?.length) {
            setHoveredShow(trendingShows.results[0])
        }
        if (!hoveredPerson && trendingPeople?.results?.length) {
            setHoveredPerson(trendingPeople.results[0])
        }
    }, [trendingMovies, trendingShows, trendingPeople, hoveredMovie, hoveredShow, hoveredPerson])

    const renderSection = (
        title,
        items,
        hoveredItem,
        setHoveredItem,
        type = "movie",
        timeWindow,
        fetchFunction
    ) => {
        return (
            <Box position="relative" overflow="hidden">
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    backgroundImage={`url(https://image.tmdb.org/t/p/original/${hoveredItem?.backdrop_path || hoveredItem?.profile_path})`}
                    backgroundSize={type === 'person' ? "fit" : "cover"}
                    backgroundPosition="center center"
                    backgroundRepeat={type === 'person' ? "repeat" : "no-repeat"}
                    transition="background-image 0.4s ease-in-out"
                    zIndex={0}
                />

                <Flex
                    direction="column"
                    p="2rem"
                    position="relative"
                    zIndex={1}
                    bg="rgba(0,0,0,0.4)"
                >
                    <Flex gap="2rem">
                        <Heading fontSize="2.5rem" mb="0.5rem" color="#e1e1e1">{title}</Heading>
                        <ButtonGroup isAttached variant="outline" width="190px" mt="5px">
                            <Button
                                width="45%"
                                borderLeftRadius="3xl"
                                height="35px"
                                onClick={() => fetchFunction("day")}
                                bg={timeWindow === "day" ? "secondary.100" : "gray.100"}
                                color={timeWindow === "day" ? "white" : "gray.800"}
                                _hover={{ bg: timeWindow === "day" ? "secondary.100" : "gray.200" }}
                            >
                                <Text fontSize="17px">Today</Text>
                            </Button>
                            <Button
                                width="55%"
                                borderRightRadius="3xl"
                                height="35px"
                                onClick={() => fetchFunction("week")}
                                bg={timeWindow === "week" ? "secondary.100" : "gray.100"}
                                color={timeWindow === "week" ? "white" : "gray.800"}
                                _hover={{ bg: timeWindow === "week" ? "secondary.600" : "gray.200" }}
                            >
                                <Text fontSize="17px">This week</Text>
                            </Button>
                        </ButtonGroup>
                    </Flex>

                    <MotionBox
                        key={`${type}-list-${timeWindow}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        display="flex"
                        flexDirection="row"
                        {...listStyles}
                    >
                        <AnimatePresence>
                            {items.map((item) =>
                                <MotionDiv
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    {type === 'person' ? (
                                        <PersonCard
                                            person={item}
                                            key={item.id}
                                            onHover={() => setHoveredItem(item)}
                                        />
                                    ) : (
                                        <ShowMovieCard
                                            item={item}
                                            key={item.id}
                                            type={type}
                                            onHover={() => setHoveredItem(item)}
                                        />
                                    )}
                                </MotionDiv>
                            )}
                        </AnimatePresence>
                    </MotionBox>
                </Flex>
            </Box>
        )
    }

    const nothingToShow =
        !trendingMovies?.results?.length &&
        !trendingShows?.results?.length &&
        !trendingPeople?.results?.length &&
        !loading

    return (
        <Flex direction="column" gap="5rem" mt="150px" mb="150px">
            <Box
                position='absolute'
                bottom='20%'
                top='26%'
                right='-40%'
                backgroundColor='secondary.200'
                borderRadius='70% 70% 70% 10% / 30% 60% 70% 70%'
                width='80%'
                height='44%'
                zIndex='-1'
            />
            <Text as="h1" id="todays-movie" {...trendingTitle}>Trending</Text>

            {trendingMovies?.results?.length > 0 &&
                renderSection("Movies", trendingMovies.results, hoveredMovie, setHoveredMovie, "movie", movieTimeWindow, fetchTrendingMovies)
            }

            {trendingShows?.results?.length > 0 &&
                renderSection("TV Shows", trendingShows.results, hoveredShow, setHoveredShow, "tv", tvTimeWindow, fetchTrendingShows)
            }

            {trendingPeople?.results?.length > 0 &&
                renderSection("People", trendingPeople.results, hoveredPerson, setHoveredPerson, "person", personTimeWindow, fetchTrendingPeople)
            }

            {loading && (
                <Text fontSize="xl" margin="auto" color="gray.400" fontStyle="italic">
                    Loading trending content...
                </Text>
            )}

            {nothingToShow && (
                <Text fontSize="2xl" margin="auto" color="main.100" fontWeight="bold">
                    No Results
                </Text>
            )}
        </Flex>
    )
}

export default TrendingContainer
