import { Text, Box, Flex } from "@chakra-ui/react"
import {
    featureInfoContainer,
} from "./FeatureInfoContainer.theme"

const FeatureInfoContainer = () => {
    return (
        <Flex {...featureInfoContainer}>
            <Box marginBottom='3rem' zIndex='100'>
                <Text as='h3' fontSize='4xl' fontWeight='bold' marginBottom='10px'>Discover a New Movie Every Day!</Text>
                <Text as='p' fontSize='lg'>Experience the best in handpicked trending movies curated by our team, with a new selection waiting for you each day.</Text>
            </Box>
            <Box zIndex='100'>
                <Text as='h3' fontSize='4xl' fontWeight='bold' marginBottom='10px'>Our Selection Process!</Text>
                <Text as='p' fontSize='lg'>Our team meticulously curates each days movie choice, ensuring that you get the best in trending cinema, thoughtfully selected for your viewing pleasure.</Text>
            </Box>
        </Flex>
    )
}

export default FeatureInfoContainer