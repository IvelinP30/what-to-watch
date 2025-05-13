
import { Flex, Text } from "@chakra-ui/react";
import MoviesGrid from "../MoviesGrid/MoviesGrid"

const SimilarItems = ({ item, type }) => {
    return (

        <Flex flexDirection='column'>
            <Text fontSize='2xl' fontWeight='black' mb='10px' color='#fff'>You might also like:</Text>
            {item.similar?.success !== false ?
                <MoviesGrid currentItems={item?.similar?.results.filter(item => item.vote_count >= 10)} noResults={item?.similar?.results.filter(item => item.vote_count >= 10).length === 0 ? true : false} type={type} />
                :
                <Flex color='#fff' fontSize='3xl' justifyContent='center' alignItems='center'>
                    <Text>There was an error. Please try again.</Text>
                </Flex>
            }

        </Flex>

    )
}

export default SimilarItems