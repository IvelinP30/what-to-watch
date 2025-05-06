import { Flex, Text, Spinner } from "@chakra-ui/react"
import PersonCard from "../People/PersonCard"

const PeopleGrid = ({ currentItems = [], noResults }) => {
    return (
        <Flex flexWrap='wrap'>
            {
                currentItems.length > 0 && !noResults ?
                    currentItems?.map(item => {
                        return <PersonCard item={item} key={item.id} />
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

export default PeopleGrid