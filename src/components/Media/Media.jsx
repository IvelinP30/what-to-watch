import { Box, Heading, Grid, GridItem, Image, Link, Button } from '@chakra-ui/react';
import { useState } from 'react';

const MediaDataSection = ({ mediaData }) => {
    const [visibleItems, setVisibleItems] = useState(9);
    const [showAll, setShowAll] = useState(false);

    const toggleVisibility = () => {
        if (showAll) {
            setVisibleItems(9);
        } else {
            setVisibleItems(mediaData.media.length);
        }
        setShowAll(!showAll);
    };

    return (
        <Box mt={10} mb={20}>
            <Heading fontSize="2rem" color="#e1e1e1" mb="2rem">
                Media
            </Heading>

            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
                {mediaData?.media.slice(0, visibleItems).map((item, index) => (
                    <GridItem key={index} borderWidth="1px" borderRadius="md" overflow="hidden" boxShadow="sm">
                        {item.type === 'video' ? (
                            <Box>
                                <Link href={`https://www.youtube.com/watch?v=${item.key}`} isExternal>
                                    <Image
                                        src={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}
                                        alt={item.name}
                                        objectFit="cover"
                                        width="100%"
                                        height="200px"
                                    />
                                </Link>
                            </Box>
                        ) : (
                            <Image
                                src={item.url}
                                alt={`mediaData ${index}`}
                                objectFit="cover"
                                width="100%"
                                height="200px"
                            />
                        )}
                    </GridItem>
                ))}
            </Grid>

            <Box textAlign="center" mt={6}>
                <Button onClick={toggleVisibility} colorScheme="blue">
                    {showAll ? 'Show Less' : 'Show More'}
                </Button>
            </Box>
        </Box>
    );
};

export default MediaDataSection;
