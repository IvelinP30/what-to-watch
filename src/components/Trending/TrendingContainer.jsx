import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { getTrendingItems } from "../../services/data"
import ShowMovieCard from "./ShowMovieCard"
import PersonCard from "./PersonCard"

import {
    todaysMovieTitle,
    listStyles,
} from "./Trending.theme"

const TrendingContainer = () => {
    const [trendingMovies, setTrendingMovies] = useState({ results: [] })
    const [trendingShows, setTrendingShows] = useState({ results: [] })
    const [trendingPeople, setTrendingPeople] = useState({ results: [] })

    const [hoveredMovie, setHoveredMovie] = useState(null)
    const [hoveredShow, setHoveredShow] = useState(null)
    const [hoveredPerson, setHoveredPerson] = useState(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTrendingData = async () => {
            try {
                const [movies, shows, people] = await Promise.all([
                    getTrendingItems('movie', 'day'),
                    getTrendingItems('tv', 'day'),
                    getTrendingItems('person', 'day'),
                ])
                setTrendingMovies(movies)
                setTrendingShows(shows)
                setTrendingPeople(people)
            } catch (error) {
                console.error("Error fetching trending data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchTrendingData()
    }, [])

    useEffect(() => {
        if (!hoveredMovie && trendingMovies?.results?.length) {
            setHoveredMovie(trendingMovies.results[0])
        }
        if (!hoveredShow && trendingShows?.results?.length) {
            setHoveredShow(trendingShows.results[0])
        }
        if (!hoveredPerson && trendingPeople?.results?.length) {
            setHoveredPerson(trendingPeople.results[1])
        }
    }, [trendingMovies, trendingShows, trendingPeople])

    const renderSection = (title, items, hoveredItem, setHoveredItem, type = 'movie') => {
        return (
            <Box position="relative" overflow="hidden">
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    backgroundImage={`url(https://image.tmdb.org/t/p/original/${hoveredItem?.backdrop_path || hoveredItem?.profile_path})`}
                    backgroundSize="cover"
                    backgroundPosition="center center"
                    backgroundRepeat="no-repeat"
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
                    <Heading fontSize="2rem" mb="0.5rem" color="#e1e1e1">{title}</Heading>
                    <Flex {...listStyles}>
                        {items.map(item =>
                            type === 'person' ? (
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
                            )
                        )}
                    </Flex>
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
        <Flex direction="column" gap="5rem" mt="100px">
            <Text as="h2" id="todays-movie" {...todaysMovieTitle}>Trending</Text>

            {trendingMovies?.results?.length > 0 &&
                renderSection("Movies", trendingMovies.results, hoveredMovie, setHoveredMovie, "movie")
            }

            {trendingShows?.results?.length > 0 &&
                renderSection("TV Shows", trendingShows.results, hoveredShow, setHoveredShow, "tv")
            }

            {trendingPeople?.results?.length > 0 &&
                renderSection("People", trendingPeople.results, hoveredPerson, setHoveredPerson, "person")
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
