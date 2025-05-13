import {
    Card,
    Image,
    Flex,
    Text,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const ShowMovieCard = ({ item, type = 'movie', onHover }) => {
    const navigate = useNavigate();

    return (
        <Card
            minW="250px"
            maxW="250px"
            height="350px"
            overflow="hidden"
            borderRadius="md"
            boxShadow="md"
            variant='elevated'
            cursor='pointer'
            color='#fff'
            transition='transform .5s'
            onMouseEnter={() => onHover?.()}
            _hover={{ transform: 'scale(1.05)' }}
            onClick={() => navigate(`/${type}/details/${item.id}`)}
        >
            <Image
                position='absolute'
                src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
                alt={`${item?.title} image`}
                objectFit='cover'
                objectPosition='center center'
                filter='brightness(80%)'
                width='100%'
                height='100%'
                fallbackSrc="/placeholder.jpg"
            />
            <Flex flexDirection='row' padding='1rem' justifyContent='space-between' gap='1rem'>
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
                    {item?.vote_average > 0 ? item?.vote_average?.toFixed(1) : 'N/A'}
                </Text>
            </Flex>
        </Card>
    );
}

export default ShowMovieCard