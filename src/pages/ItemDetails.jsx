import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getItem, getItemCredits, getItemExternalIds, getItemProviders, getItemTrailer, getSimilarItems } from "../services/movieService";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";

import SimilarItems from "../components/SimilarItems/SimilarItems";
import Trailer from "../components/Trailer/Trailer";
import ItemInformation from "../components/ItemInformation/ItemInformation";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import Credits from "../components/Credits/Credits"
import FavoriteWatchLaterButtons from "../components/FavoriteWatchLaterButtons/FavoriteWatchLaterButtons";

const ItemDetails = () => {
    const { id, type } = useParams();
    const [item, setitem] = useState({})

    useEffect(() => {
        const fetchMovie = async () => {
            const movieData = await getItem(id, type);
            const providers = await getItemProviders(id, type);
            const trailer = await getItemTrailer(id, type);
            const similar = await getSimilarItems(id, type);
            const externalIds = await getItemExternalIds(id, type);
            const credits = await getItemCredits(id, type);
            setitem({ ...movieData, providers, trailer, similar, externalIds, credits });
        }
        fetchMovie();
    }, [id, type]);

    return (
        <Box background='background.100' overflow='hidden' position='relative'>

            <Box
                position='absolute'
                top='0'
                left='-20%'
                backgroundColor='background.200'
                borderRadius='30% 70% 70% 30% / 30% 30% 70% 70% '
                width='46%'
                height='100%'
                zIndex='0'
            />

            <Box
                position='absolute'
                bottom='0'
                right='-20%'
                backgroundColor='background.200'
                borderRadius='70% 30% 31% 69% / 36% 49% 51% 64% '
                width='40%'
                height='50%'
                zIndex='0'
            />
            <Flex gap='1rem' padding={{ base: '15rem 0', sm: '12rem 0', xs: '20rem 0' }} margin='0 2rem' flexDirection='column' >
                <Flex width="99%" justifyContent="flex-end">
                    <FavoriteWatchLaterButtons />
                </Flex>
                <Flex gap='4rem' width="100%" flexDirection={{ base: 'column', lg: 'row' }} >
                    <ItemInformation item={item} type={type} />
                    <Flex width={{base: '100%', lg: "75%"}} flexBasis='80%' flexDirection='column' gap='2rem' zIndex='100'>
                        <Trailer item={item} />
                        <Flex flexDirection='column' gap='5px'>
                            <Heading fontSize="2rem" mb="0.5rem" color='#e1e1e1'>Overview</Heading>
                            <Text color='#afafaf'>{item?.overview}</Text>
                        </Flex>
                        <Flex width="100%" justifyContent="flex-end">
                            {(item.externalIds || item.homepage) &&  <SocialLinks externalIds={item.externalIds} homepage={item.homepage} />}
                        </Flex>
                        <Box>
                            <Credits width="100%" creditsList={item.credits} />
                        </Box>
                        <SimilarItems item={item} type={type} />
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}

export default ItemDetails