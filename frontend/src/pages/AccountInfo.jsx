import { useEffect, useState, useContext } from 'react';
import {
    Text,
    Flex,
    Box,
    Spinner,
    Center,
    Divider,
    Card
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

                    <Box p={5} pt={10}>
                        <Card
                            background="rgba(0, 0, 0, 0.3)"
                            backdropFilter="blur(20px)"
                            variant='elevated'
                            borderRadius="lg"
                            p={3}
                            width="100%"
                            boxShadow="0 4px 30px rgba(0, 0, 0, 0.5)"
                        >
                            {loading ? (
                                <Center><Spinner size="xl" color="red.400" /></Center>
                            ) : (
                                <Flex
                                    wrap="wrap"
                                    gap={10}
                                    justify="space-evenly"
                                    align="center"
                                    pt={10}
                                    pb={10}
                                    pr={5}
                                    pl={5}
                                >
                                    <Flex align="center" gap={3} minWidth="200px">
                                        <FaUser color="#fff" size={28} />
                                        <Text fontSize={{ base: 'xl', lg: '2xl' }} color="white">
                                            Name: <strong>{user.name}</strong>
                                        </Text>
                                    </Flex>

                                    <Flex align="center" gap={3} minWidth="200px" >
                                        <FaStar color="pink" size={28} />
                                        <Text fontSize={{ base: 'xl', lg: '2xl' }} color="white" cursor='pointer' onClick={() => navigate('/account/favorites')} _hover={{ textDecoration: "underline" }}>
                                            Favorites: <strong>{favCount}</strong>
                                        </Text>
                                    </Flex>

                                    <Flex align="center" gap={3} minWidth="200px"  >
                                        <MdWatchLater color="yellow" size={28} />
                                        <Text fontSize={{ base: 'xl', lg: '2xl' }} color="white" cursor="pointer" onClick={() => navigate('/account/watch-later')} _hover={{ textDecoration: "underline" }}>
                                            Watch Later: <strong>{watchCount}</strong>
                                        </Text>
                                    </Flex>
                                    <Flex align="center" gap={3} minWidth="200px">
                                        <FaCalendarAlt color="gray" size={28} />
                                        <Text fontSize={{ base: 'xl', lg: '2xl' }} color="white">
                                            Account Created: <strong>{new Date(user.createdAt).toLocaleDateString()}</strong>
                                        </Text>
                                    </Flex>
                                </Flex>
                            )}
                        </Card>
                    </Box>
                </PageWrapper>
            </Flex>
        </Flex>
    );
};

export default AccountInfo;
