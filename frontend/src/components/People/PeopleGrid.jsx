import { Flex, Text, Spinner } from "@chakra-ui/react"
import PersonCard from "../People/PersonCard"

const PeopleGrid = ({ currentPeople = [], noResults }) => {
    return (
        <Flex flexWrap='wrap'>
            {
                currentPeople.length > 0 && !noResults ?
                    currentPeople?.map(person => {
                        return <PersonCard person={person} key={person.id} />
                    })
                    : currentPeople.length === 0 && noResults ?
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