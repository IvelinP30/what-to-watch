import {
    Card,
    Image,
    Flex,
    Heading,
    Text,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const PersonCard = ({ person }) => {
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
            onClick={() => navigate(`/person/details/${person.id}`)}
        >
            <Image
                position='absolute'
                src={`https://image.tmdb.org/t/p/original/${person?.profile_path}`}
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
                <Heading fontSize="1.5rem" position='relative'>
                    {person?.name || person?.original_name}
                </Heading>
                <Text
                    position='absolute'
                    backgroundColor='main.100'
                    bottom='0'
                    right='0'
                    minWidth='6rem'
                    width='auto'
                    height='4rem'
                    padding='1.3rem 1rem 0 1.5rem'
                    borderRadius='50px 0 0 0'
                    fontWeight='black'
                    fontSize='lg'
                >
                    {
                        person?.known_for_department ?? 'N/A'
                    }
                </Text>
            </Flex>
        </Card>
    )
}

export default PersonCard