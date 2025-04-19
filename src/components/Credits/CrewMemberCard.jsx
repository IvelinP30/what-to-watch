import {
    Card,
    CardBody,
    Image,
    Heading,
    Stack,
    Text
} from "@chakra-ui/react"

const CrewMemberCard = ({ crewMember }) => {
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
                    src={`https://image.tmdb.org/t/p/original/${crewMember.profile_path}`}
                    alt={`${crewMember.name} image`}
                    height='200px'
                    width="100%"
                    objectFit="cover"
                    fallbackSrc="/placeholder.jpg"
                />
                <Stack spacing="1" padding="0.5rem">
                    <Heading size="md" noOfLines={2}>
                        {crewMember.name}
                    </Heading>
                    <Text fontSize="sm" noOfLines={2}>
                        {crewMember.job}
                    </Text>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default CrewMemberCard
