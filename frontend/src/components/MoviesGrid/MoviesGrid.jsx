import { Flex, Text, Spinner } from "@chakra-ui/react"
import MovieCard from "../MovieCard/MovieCard"

const  MoviesGrid = ({currentItems = [], noResults, type='movie'}) => {
    return (
        <Flex flexWrap='wrap'>
            {
                currentItems.length > 0 && !noResults ?
                    currentItems?.map(item => {
                        item.video === false ? type = 'movie' : type = 'tv'
                        return (
                            <MovieCard item={item} key={item.id} type={type} />
                        )
                    })
                    : currentItems.length === 0 && noResults ?
                        <Text
                            fontSize='2xl'
                            margin='200px auto'
                            color='main.100'
                            fontWeight='bold'
                        >No Results</Text>
                        : <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='main.100'
                            size='xl'
                            margin='200px auto'
                        />
            }
        </Flex>
    )
}

export default MoviesGrid