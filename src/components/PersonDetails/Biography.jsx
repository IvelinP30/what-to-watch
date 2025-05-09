import { Flex, Text, Box, Heading } from "@chakra-ui/react";
import KnownFor from "./KnownFor";

const Biography = ({ person }) => {

    return (
        <Flex width='100%' flexDirection='column'>
            <Heading fontSize="3rem" fontWeight='bold' mb={5} color='#e1e1e1'>{person.name}</Heading>
            <Flex flexDirection='column' gap='5px' mb={5}>
                <Heading fontSize="2rem" mb="0.5rem" color='#e1e1e1'>Biography</Heading>
                <Text color="white" fontSize="1.1rem">{person?.biography}</Text>
            </Flex>
            <Box>
                <KnownFor width="100%" knownForList={person.knownFor} />
            </Box>
        </Flex>
    )
}

export default Biography