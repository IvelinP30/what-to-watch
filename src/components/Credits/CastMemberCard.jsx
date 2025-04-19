import {
    Card,
    CardBody,
    Image,
    Heading,
    Stack,
    Text
} from "@chakra-ui/react"

const CastMemberCard = ({ castMember }) => {
    return (
        <Card
            minW="150px"
            maxW="150px"
            height="300px"
            overflow="hidden"
            borderRadius="md"
            boxShadow="md"
        >
            <CardBody padding="0">
                <Image
                    src={`https://image.tmdb.org/t/p/original/${castMember.profile_path}`}
                    alt={`${castMember.name} image`}
                    height='200px'
                    width="100%"
                    objectFit="cover"
                    fallbackSrc="/placeholder.jpg"
                />
                <Stack spacing="1" padding="0.5rem">
                    <Heading size="md" noOfLines={2}>
                        {castMember.name}
                    </Heading>
                    <Text fontSize="sm" noOfLines={2}>
                        {castMember.character}
                    </Text>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default CastMemberCard
