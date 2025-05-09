import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem, getItemExternalIds, getPersonCombinedCredits } from "../services/data";
import { Box, Flex, Spinner, Center } from "@chakra-ui/react";

import Biography from "../components/PersonDetails/Biography";
import PersonalInfo from "../components/PersonDetails/PersonalInfo";
import FavoriteWatchLaterButtons from "../components/FavoriteWatchLaterButtons/FavoriteWatchLaterButtons";

const ItemDetails = () => {
    const { id } = useParams();
    const [person, setPerson] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);

            try {
                const personData = await getItem(id, 'person');
                const combinedCredits = await getPersonCombinedCredits(id);
                const knownFor = combinedCredits?.cast
                    ? [...combinedCredits.cast]
                        .filter(item =>
                            (item.media_type === 'movie' || item.media_type === 'tv') && !item.adult
                        )
                        .sort((a, b) => {
                            const aScore = a.popularity * 2 + a.vote_average * a.vote_count;
                            const bScore = b.popularity * 2 + b.vote_average * b.vote_count;
                            return bScore - aScore;
                        })
                        .filter((item, index, self) => {
                            const key = item.title || item.name;
                            return index === self.findIndex(i => (i.title || i.name) === key);
                        })
                        .slice(0, 20)
                    : [];
                const externalIds = await getItemExternalIds(id, 'person');
                setPerson({ ...personData, knownFor, combinedCredits, externalIds });
            } catch (error) {
                console.error("Failed to fetch person data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) {
        return (
            <Center h="100vh" bg="background.100">
                <Spinner size="xl" thickness="4px" speed="0.65s" color="white" />
            </Center>
        );
    }

    return (
        <Box background='background.100' overflow='hidden' position='relative'>
            <Box
                position='absolute'
                top='0'
                left='-20%'
                backgroundColor='background.200'
                borderRadius='30% 70% 70% 30% / 30% 30% 70% 70%'
                width='46%'
                height='100%'
                zIndex='0'
            />
            <Box
                position='absolute'
                bottom='0'
                right='-20%'
                backgroundColor='background.200'
                borderRadius='70% 30% 31% 69% / 36% 49% 51% 64%'
                width='40%'
                height='50%'
                zIndex='0'
            />

            <Flex gap='1rem' padding={{ base: '15rem 0', sm: '12rem 0', xs: '20rem 0' }} margin='0 2rem' flexDirection='column'>
                <Flex width="99%" justifyContent="flex-end">
                    <FavoriteWatchLaterButtons hideWatchlist={true} />
                </Flex>
                <Flex gap='4rem' width="100%" flexDirection={{ base: 'column', lg: 'row' }}>
                    <PersonalInfo person={person} />
                    <Flex width={{ base: '100%', lg: "55%" }} flexBasis='80%' flexDirection='column' gap='2rem' zIndex='100'>
                        <Biography person={person} />
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default ItemDetails;
