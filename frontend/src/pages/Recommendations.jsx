import { useEffect, useState, useContext } from "react";
import {
    Flex,
    Box,
    Text,
    Image,
    Heading,
    SimpleGrid,
    Spinner,
    Center,
    Divider
} from "@chakra-ui/react";
import PageWrapper from '../components/PageWrapper';
import { getRecommendations } from "../services/recommendations";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Recommendations = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const data = await getRecommendations();
                setRecommendations(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (error)
        return (
            <Center height="100vh">
                <Text fontSize="lg" color="red.400">
                    Error: {error}
                </Text>
            </Center>
        );

    return (
        <Flex
            backgroundColor="background.100"
            position="relative"
            minHeight="100vh"
            overflow='hidden'
        >
            <Box
                position="absolute"
                top="0"
                right="-20%"
                backgroundColor="background.200"
                borderRadius="30% 70% 70% 30% / 30% 30% 70% 70%"
                width="100%"
                height="100%"
                zIndex="0"
                minHeight="200vh"
            />

            <Flex
                direction="column"
                zIndex="1"
                width="100%"
                padding={{ base: '25rem 1rem 2rem', lg: '13rem 2rem 2rem' }}
                color="white"
            >

                <PageWrapper title={`${user?.name}'s Personalized Recommendations`} largeTitle iconType='recommendations'>
                    <Text as="p" fontSize={{ base: 'lg', lg: 'xl' }} color="gray.300" marginBottom="40px">
                        Based on your favorites and watch later lists, here are some movies and TV shows you&apos;ll likely enjoy.
                    </Text>

                    <Divider borderColor="secondary.100" borderWidth="3px" borderRadius={10} mb="2rem" />

                    <Text as="p" fontSize="md" color="gray.400" mb={4}>
                        Showing top <strong>50</strong> personalized recommendations
                    </Text>

                    <Box
                        padding="2rem"
                        background="rgba(0, 0, 0, 0.3)"
                        backdropFilter="blur(20px)"
                        variant='elevated'
                        borderRadius="lg"
                        boxShadow="0 4px 30px rgba(0, 0, 0, 0.5)"
                    >

                        {loading ? (
                            <Center><Spinner size="xl" color="red.400" /></Center>
                        ) : recommendations.length === 0 ? (
                            <Text fontSize="xl" color="gray.300">{`You haven't added any favorites yet.`}</Text>
                        ) : (
                            <SimpleGrid
                                columns={{ base: 2, md: 3, lg: 4 }}
                                spacing={6}
                                minChildWidth="250px"
                            >
                                {recommendations.map((rec) => (
                                    <Box
                                        key={`${rec.type}-${rec.itemId}`}
                                        bg="gray.800"
                                        borderRadius="lg"
                                        overflow="hidden"
                                        boxShadow="md"
                                        _hover={{ boxShadow: "xl" }}
                                        transition="box-shadow 0.3s ease"
                                        cursor="pointer"
                                        onClick={() => navigate(`/${rec.type.toLowerCase()}/details/${rec.itemId}`)}
                                    >
                                        <Image
                                            src={rec.imageUrl || "/placeholder.png"}
                                            alt={rec.name}
                                            objectFit="cover"
                                            width="100%"
                                            height="350px"
                                            fallbackSrc="/placeholder.png"
                                            transition="transform .5s"
                                            _hover={{ transform: 'scale(1.05)' }}
                                        />
                                        <Box p={6}>
                                            <Heading
                                                as="h3"
                                                size="md"
                                                fontWeight="semibold"
                                                color="white"
                                                noOfLines={2}
                                            >
                                                {rec.name}
                                            </Heading>
                                            <Text
                                                fontSize="sm"
                                                fontWeight="medium"
                                                color="gray.400"
                                                mt={1}
                                                textTransform="uppercase"
                                            >
                                                {rec.type}
                                            </Text>
                                        </Box>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        )}
                    </Box>
                </PageWrapper>
            </Flex>
        </Flex>
    );
};

export default Recommendations;