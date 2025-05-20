import { useEffect, useState, useContext } from 'react';
import {
    Text,
    Flex,
    Box,
    Spinner,
    Center,
    Divider,
    Card,
    Grid,
    GridItem
} from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import { getFavorites } from '../services/favourite';
import { getWatchLater } from '../services/watchLater';
import PageWrapper from '../components/PageWrapper';
import { FaStar, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { MdWatchLater } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const AccountInfo = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [favCount, setFavCount] = useState(0);
    const [watchCount, setWatchCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchCounts = async () => {
        try {
            const [favs, watch] = await Promise.all([
                getFavorites(),
                getWatchLater()
            ]);
            setFavCount(favs.length);
            setWatchCount(watch.length);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCounts();
    }, []);

    return (
        <Flex
            backgroundColor="background.100"
            position="relative"
            minHeight="100vh"
            overflow="hidden"
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
                <PageWrapper title="Account Information" largeTitle iconType="accountInfo">
                    <Text as="p" fontSize={{ base: 'lg', lg: 'xl' }} color="gray.300" mb="40px">
                        Here are the details of your account.
                    </Text>

                    <Divider borderColor="main.100" borderWidth="3px" borderRadius={10} mb="2rem" />

                    <Flex justifyContent="center" alignItems="center" height="70%" p={5} pt={10}>
                        <Card
                            background="rgba(0, 0, 0, 0.3)"
                            backdropFilter="blur(20px)"
                            variant='elevated'
                            borderRadius="lg"
                            p={8}
                            width={{ base: '100%', lg: '70%' }}
                            boxShadow="0 4px 30px rgba(0, 0, 0, 0.5)"
                        >
                            {loading ? (
                                <Center><Spinner size="xl" color="red.400" /></Center>
                            ) : (
                                <Grid
                                    templateColumns={{ base: '1fr', md: '1fr 1fr' }}
                                    templateRows="repeat(2, auto)"
                                    gap={10}
                                    textAlign={{ base: 'center', md: 'left' }}
                                >
                                    <GridItem>
                                        <Flex align="center" gap={3}>
                                            <FaUser color="#fff" size={28} />
                                            <Box>
                                                <Text fontSize="sm" color="gray.400" fontWeight="medium">
                                                    Name
                                                </Text>
                                                <Text fontSize="2xl" color="white" fontWeight="bold">
                                                    {user.name}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </GridItem>

                                    <GridItem>
                                        <Flex align="center" gap={3}>
                                            <FaCalendarAlt color="gray" size={28} />
                                            <Box>
                                                <Text fontSize="sm" color="gray.400" fontWeight="medium">
                                                    Account Created
                                                </Text>
                                                <Text fontSize="2xl" color="white" fontWeight="bold">
                                                    {new Date(user.createdAt).toLocaleString()}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </GridItem>

                                    <GridItem>
                                        <Box
                                            onClick={() => navigate('/account/favorites')}
                                            cursor="pointer"
                                            role="group"
                                            _hover={{ bg: 'rgba(255, 192, 203, 0.1)', borderRadius: 'md' }}
                                            p={2}
                                        >
                                            <Flex align="center" gap={3}>
                                                <FaStar color="pink" size={28} />
                                                <Box>
                                                    <Text fontSize="sm" color="gray.400" fontWeight="medium">
                                                        Favorites
                                                    </Text>
                                                    <Text fontSize="2xl" color="white" fontWeight="bold">
                                                        {favCount}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                        </Box>
                                    </GridItem>


                                    <GridItem>
                                        <Box
                                            onClick={() => navigate('/account/watch-later')}
                                            cursor="pointer"
                                            role="group"
                                            _hover={{ bg: 'rgba(255, 255, 0, 0.1)', borderRadius: 'md' }}
                                            p={2}
                                        >
                                            <Flex align="center" gap={3}>
                                                <MdWatchLater color="yellow" size={28} />
                                                <Box>
                                                    <Text fontSize="sm" color="gray.400" fontWeight="medium">
                                                        Watch Later
                                                    </Text>
                                                    <Text fontSize="2xl" color="white" fontWeight="bold">
                                                        {watchCount}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                        </Box>
                                    </GridItem>

                                </Grid>
                            )}
                        </Card>
                    </Flex>
                </PageWrapper>
            </Flex>
        </Flex>
    );
};

export default AccountInfo;
