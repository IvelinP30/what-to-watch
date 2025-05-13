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
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';

const ActingCredits = ({ credits }) => {
    const bgColor = useColorModeValue('gray.100', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const headingColor = useColorModeValue('gray.800', 'gray.100');

    const filteredCredits = credits.filter(
        credit =>
            (credit.release_date || credit.first_air_date) &&
            credit.poster_path
    );

    const groupedByYear = filteredCredits.reduce((acc, credit) => {
        const date = new Date(credit.release_date || credit.first_air_date);
        const year = date.getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(credit);
        return acc;
    }, {});

    const sortedYears = Object.keys(groupedByYear)
        .map(Number)
        .sort((a, b) => b - a);

    return (
        <Box
            mt={10}
            p={10}
            borderRadius="2xl"
            bg="rgba(255, 255, 255, 0.05)"
            backdropFilter="blur(10px)"
        >
            <Heading fontSize="2rem" ml={-5} color="#e1e1e1" mb="2rem">
                Acting Credits
            </Heading>

            <Accordion allowMultiple defaultIndex={[]}>

                {sortedYears.map((year) => (
                    <AccordionItem key={year} border="none">
                        <h2>
                            <AccordionButton
                                _hover={{ bg: 'gray.600', color: 'white' }}
                                _expanded={{ bg: 'gray.600', color: 'white' }}
                                py={4}
                                px={6}
                                borderRadius="md"
                                mb={2}
                                bg={bgColor}
                                border="1px solid"
                                transition="background 0.3s ease, color 0.3s ease"
                                borderColor={borderColor}
                            >
                                <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg" color="inherit">
                                    {year}
                                </Box>
                                <AccordionIcon color="inherit" />
                            </AccordionButton>

                        </h2>

                        <AccordionPanel pb={4}>
                            <VStack spacing={6} align="stretch">
                                {groupedByYear[year]
                                    .sort((a, b) => {
                                        const aDate = new Date(a.release_date || a.first_air_date).getTime();
                                        const bDate = new Date(b.release_date || b.first_air_date).getTime();
                                        return bDate - aDate;
                                    })
                                    .map((credit) => {
                                        const posterUrl = `https://image.tmdb.org/t/p/w342${credit.poster_path}`;
                                        return (
                                            <Box
                                                key={credit.id}
                                                borderWidth="1px"
                                                borderRadius="lg"
                                                overflow="hidden"
                                                p={4}
                                                bg={bgColor}
                                                borderColor={borderColor}
                                                boxShadow="md"
                                                maxW="5xl"
                                                minW="100%"
                                                mx="auto"
                                            >
                                                <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
                                                    <Box flexShrink={0}>
                                                        <Image
                                                            src={posterUrl}
                                                            alt={credit.title || credit.name}
                                                            borderRadius="md"
                                                            objectFit="cover"
                                                            maxW={{ base: '100%', md: '150px' }}
                                                        />
                                                    </Box>

                                                    <VStack align="start" spacing={3} flex="1">
                                                        <Heading size="lg" color={headingColor}>
                                                            {credit.title || credit.name}
                                                        </Heading>

                                                        <HStack spacing={4}>
                                                            <Badge colorScheme="green" fontSize="0.8em" borderRadius="md" p="4px">
                                                                {year}
                                                            </Badge>
                                                            <Badge
                                                                colorScheme={credit.media_type === 'tv' ? 'blue' : 'green'}
                                                                fontSize="0.8em"
                                                                borderRadius="md"
                                                                p="4px"
                                                            >
                                                                {credit.media_type === 'tv' ? 'TV' : 'Movie'}
                                                            </Badge>
                                                        </HStack>

                                                        <Text fontSize="sm" fontWeight="medium">
                                                            Character:{' '}
                                                            <Text as="span" fontWeight="normal">
                                                                {credit.character || 'N/A'}
                                                            </Text>
                                                        </Text>

                                                        <Text fontSize="sm" color={textColor}>
                                                            {credit.overview || 'No overview available.'}
                                                        </Text>
                                                    </VStack>
                                                </Flex>
                                            </Box>
                                        );
                                    })}
                            </VStack>
                        </AccordionPanel>
                    </AccordionItem>
                ))}

            </Accordion>
        </Box>
    );
};

export default ActingCredits;
