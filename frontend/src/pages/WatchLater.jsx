import { useEffect, useState, useContext } from 'react';
import {
    Spinner,
    Center,
    Text,
    Flex,
    Box,
    Divider
} from '@chakra-ui/react';
import PageWrapper from '../components/PageWrapper';
import MediaCard from '../components/MediaCard';
import { getWatchLater, removeFromWatchLater } from '../services/watchLater';
import { AuthContext } from '../context/AuthContext';

const WatchLater = () => {
    const { user } = useContext(AuthContext);
    const [watchLater, setWatchLater] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWatchLater = async () => {
        setLoading(true); fetchWatchLater
        try {
            const data = await getWatchLater();
            setWatchLater(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (id) => {
        await removeFromWatchLater(id);
        fetchWatchLater();
    };

    useEffect(() => {
        fetchWatchLater();
    }, []);

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
                <PageWrapper title={`${user?.name}'s watch later list`} largeTitle iconType='watchLater'>
                    <Text as="p" fontSize={{ base: 'lg', lg: 'xl' }} color="gray.300" marginBottom="40px">
                        Your list of movies and TV shows to watch later.
                    </Text>
                    <Divider borderColor="yellow.300" borderWidth="3px" borderRadius={10} mb="2rem" />

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
                        ) : watchLater.length === 0 ? (
                            <Text fontSize="xl" color="gray.300">{`You haven't added any to watch later list yet.`}</Text>
                        ) : (
                            <Flex spacing={6} flexWrap='wrap' gap="2rem">
                                {watchLater.map(item => (
                                    <MediaCard
                                        key={item.id}
                                        itemId={item.itemId}
                                        name={item.name}
                                        imageURL={item.imageURL}
                                        type={item.type}
                                        onRemove={() => handleRemove(item.itemId)}
                                    />
                                ))}
                            </Flex>
                        )}
                    </Box>
                </PageWrapper>
            </Flex>
        </Flex>
    );
};

export default WatchLater;
