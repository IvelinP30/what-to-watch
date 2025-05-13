import {
    Box,
    Heading,
    Text,
    Badge,
    VStack,
    HStack,
    useColorModeValue,
    Image,
    Flex,
} from '@chakra-ui/react';

const LastSeasonCard = ({ season }) => {
    const bgColor = useColorModeValue('gray.100', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const textColor = useColorModeValue('gray.600', 'gray.300');

    if (!season) return null;

    const posterUrl = season.poster_path
        ? `https://image.tmdb.org/t/p/w342${season.poster_path}`
        : null;

    return (
        <Box>
            <Heading fontSize="2rem" color="#e1e1e1" mb="2rem" >
                Last Season
            </Heading>

            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                bg={bgColor}
                borderColor={borderColor}
                boxShadow="md"
                maxW="5xl"
                mx="auto"
                py={6}
            >
                <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
                    {posterUrl && (
                        <Box flexShrink={0}>
                            <Image
                                src={posterUrl}
                                alt={season.name}
                                borderRadius="md"
                                objectFit="cover"
                                maxW={{ base: '100%', md: '200px' }}
                            />
                        </Box>
                    )}

                    <VStack align="start" spacing={4} flex="1">
                        <Heading size="lg">{season.name}</Heading>

                        <HStack spacing={4}>
                            <Badge colorScheme="green" fontSize="0.9em" borderRadius="md" p="5px">
                                {season.vote_average}
                            </Badge>
                            <Text fontSize="sm">
                                {new Date(season.air_date).getFullYear()} • {season.episode_count} Episodes
                            </Text>
                        </HStack>

                        <Text fontSize="md" color={textColor} width="90%">
                            {season.overview || 'No overview available.'}
                        </Text>
                    </VStack>
                </Flex>
            </Box>
        </Box>
    );
};

export default LastSeasonCard;
