import { Flex, Text, Spinner } from "@chakra-ui/react"
import ResultCard from "../Search/ResultCard"

const SearchResultsGrid = ({ currentItems = [], noResults }) => {
    return (
        <Flex flexWrap='wrap'>
            {
                currentItems.length > 0 && !noResults ?
                    currentItems?.map(item => {
                        const type = item.media_type || 'movie';
                        return (
                            <ResultCard item={item} key={`${type}-${item.id}`} type={type} />
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

export default SearchResultsGrid