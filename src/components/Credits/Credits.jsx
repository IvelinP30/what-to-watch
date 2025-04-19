import { Flex, Text, Heading } from "@chakra-ui/react"
import CastMemberCard from "./CastMemberCard"
import CrewMemberCard from "./CrewMemberCard"

const CreditsList = ({ creditsList = {} }) => {
    const cast = creditsList?.cast ?? []
    const crew = creditsList?.crew ?? []

    const hasCast = cast.length > 0
    const hasCrew = crew.length > 0
    const nothingToShow = !hasCast && !hasCrew

    const listStyles = {
        overflowX: "scroll",
        gap: "1rem",
        padding: "0.5rem",
        width: "100%",
        sx: {
            "::-webkit-scrollbar": { height: "10px" },
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
            {hasCast && (
                <Flex direction="column">
                    <Heading fontSize="2rem" mb="0.5rem" color="#e1e1e1">Cast</Heading>
                    <Flex {...listStyles}>
                        {cast.map(castMember => (
                            <CastMemberCard castMember={castMember} key={castMember.id} />
                        ))}
                    </Flex>
                </Flex>
            )}

            {hasCrew && (
                <Flex direction="column">
                    <Heading fontSize="2rem" mb="0.5rem" color="#e1e1e1">Crew</Heading>
                    <Flex {...listStyles}>
                        {crew.map(crewMember => (
                            <CrewMemberCard crewMember={crewMember} key={crewMember.id} />
                        ))}
                    </Flex>
                </Flex>
            )}

            {nothingToShow && (
                <Text
                    fontSize="2xl"
                    margin="auto"
                    color="main.100"
                    fontWeight="bold"
                >
                    No Results
                </Text>
            )}
        </Flex>
    )
}

export default CreditsList
