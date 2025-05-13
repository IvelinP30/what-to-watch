import { Flex, Text, Box, Heading } from "@chakra-ui/react";
import KnownFor from "./KnownFor";
import ActingCredits from "./ActingCredits";
import AudioButton from "../AudioButton/AudioButton";

const Biography = ({ person }) => {
    const biography = person?.biography?.trim();

    return (
        <Flex width='100%' flexDirection='column'>
            <Heading fontSize="3rem" fontWeight='bold' mb={5} color='#e1e1e1'>
                {person.name}
            </Heading>

            <Flex flexDirection='column' gap='5px' mb={5}>
                <Heading fontSize="2rem" mb="0.5rem" color='#e1e1e1'>Biography
                    <Box ml={4} display="inline">
                        <AudioButton
                            text={biography}
                            buttonLabel="Read Biography Aloud"
                        />
                    </Box>
                </Heading>
                <Text
                    color={biography ? "white" : "#afafaf"}
                    fontSize={biography ? "1.1rem" : "1.3rem"}
                    fontWeight={biography ? "normal" : "bold"}
                >
                    {biography ? biography : "No biography available."}
                </Text>
            </Flex>

            <Box>
                <KnownFor width="100%" knownForList={person.knownFor} />
            </Box>
            <Box>
                <ActingCredits width="100%" credits={person.combinedCredits.cast} />
            </Box>
        </Flex>
    );
};

export default Biography;
