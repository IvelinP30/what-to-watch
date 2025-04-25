import {
    Card,
    CardBody,
    Image,
    Heading,
    Stack,
    Text
} from "@chakra-ui/react"

const PersonCard = ({ person, onHover }) => {
    return (
        <Card
            minW="200px"
            maxW="200px"
            height="300px"
            overflow="hidden"
            borderRadius="md"
            boxShadow="md"
            variant='elevated'
            cursor='pointer'
            _hover={{ transform: 'scale(1.05)' }}
            transition='transform .5s'
            onMouseEnter={() => onHover?.()}
        >
            <CardBody padding="0">
                <Image
                    src={`https://image.tmdb.org/t/p/original/${person?.profile_path}`}
                    alt={`${person?.name} image`}
                    height='200px'
                    width="100%"
                    objectFit="cover"
                    objectPosition='center center'
                    filter='brightness(80%)'
                    fallbackSrc="/placeholder.jpg"
                />
                <Stack spacing="1" padding="0.5rem">
                    <Heading size="md" noOfLines={2}>
                        {person.name}
                    </Heading>
                    <Text fontSize="sm" noOfLines={2}>
                        {person.known_for_department}
                    </Text>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default PersonCard
