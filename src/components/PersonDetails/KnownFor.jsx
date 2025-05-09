import { Flex, Heading } from "@chakra-ui/react"
import MovieCard from "../MovieCard/MovieCard"

const KnownFor = ({ knownForList = [] }) => {

    const listStyles = {
        overflowX: "scroll",
        gap: "1rem",
        padding: "2rem",
        width: "100%",
        sx: {
            "::-webkit-scrollbar": { height: "10px" },
            '::-webkit-scrollbar-track': {
                background: 'black',
                borderRadius: '10px'
            },
            "::-webkit-scrollbar-thumb": {
                background: "white",
                borderRadius: "8px"
            },
            "::-webkit-scrollbar-thumb:hover": {
                background: "gray.200"
            }
        }
    }

    return (
        <Flex direction="column" gap="4rem" mt="30px" mb="40px">
            <Flex direction="column">
                <Heading fontSize="2rem" mb="0.5rem" color="#e1e1e1">Known For</Heading>
                <Flex {...listStyles}>
                    {knownForList.map(listItem => (
                        <MovieCard item={listItem} key={listItem.id} type={listItem.media_type} />
                    ))}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default KnownFor
