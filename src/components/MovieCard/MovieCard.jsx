import {
    Card,
    Image,
    Flex,
    Heading,
    Text,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const MovieCard = ({ item, type = 'movie' }) => {
    const navigate = useNavigate();
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
                src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
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
                    {type === 'movie'
                        ? (item?.title || item?.original_name)
                        : (item?.name || item?.original_name)} ({item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4)})
                </Heading>
                <Text
                    position='absolute'
                    backgroundColor='main.100'
                    bottom='0'
                    right='0'
                    width='4rem'
                    height='4rem'
                    padding='1.3rem 0 0 1.5rem'
                    borderRadius='50px 0 0 0'
                    fontWeight='black'
                    fontSize='lg'
                >
                    {
                        item?.vote_average > 0 ?
                            item?.vote_average?.toFixed(1) :
                            'N/A'
                    }
                </Text>
            </Flex>
        </Card>
    )
}

export default MovieCard