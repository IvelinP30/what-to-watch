import {
    Card,
    Image,
    Flex,
    Heading,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const ResultCard = ({ item, type = 'movie' }) => {
    const navigate = useNavigate();

    const isPerson = type === 'person';
    const imagePath = isPerson
        ? item?.profile_path
        : item?.backdrop_path;

    const title = isPerson
        ? item?.name
        : (item?.title || item?.name || item?.original_name);

    const year = isPerson
        ? null
        : item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4);

    return (
        <Card
            overflow='hidden'
            variant='elevated'
            flexBasis={{ base: '100%', md: '50%', lg: '33.33%' }}
            color='#fff'
            borderRadius='0'
            width='300px'
            height='300px'
            cursor='pointer'
            onClick={() => navigate(`/${type}/details/${item.id}`)}
        >
            <Image
                position='absolute'
                src={`https://image.tmdb.org/t/p/original/${imagePath}`}
                objectFit='cover'
                objectPosition='center center'
                filter='brightness(80%)'
                width='100%'
                height='100%'
                transition='transform .5s'
                _hover={{
                    transform: 'scale(1.1)'
                }}
                fallbackSrc="/placeholder.jpg"
            />
            <Flex flexDirection='row' padding='1rem' justifyContent='space-between' gap='1rem'>
                <Heading size='md' position='relative'>
                    {title} {year ? `(${year})` : ''}
                </Heading>
            </Flex>
        </Card>
    )
}

export default ResultCard
