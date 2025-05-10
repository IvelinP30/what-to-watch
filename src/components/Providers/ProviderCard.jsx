import {
    Card,
    CardBody,
    Image,
    Heading,
    Stack,
    Flex
} from "@chakra-ui/react";

const formatProviderNameToUrl = (name) => {
    return name
        .toLowerCase()
        .replace(/[^\w-]+/g, '');
};

const ProviderCard = ({ provider }) => {
    const providerName = provider?.provider_name || '';
    const formattedProviderName = formatProviderNameToUrl(providerName);

    const baseUrl = `https://www.`;
    const providerLink = `${baseUrl}${formattedProviderName}.com`;

    const handleCardClick = () => {
        window.open(providerLink, "_blank");
    };

    return (
        <Card
            variant="elevated"
            flexBasis={{ base: '100%', md: '50%', lg: '20%' }}
            borderRadius={7}
            overflow="hidden"
            backgroundColor="rgba(23, 25, 35, 0.5)"
            backdropFilter="blur(5px)"
            color="white"
            height="250px"
            transition='transform .5s'
            _hover={{
                transform: 'scale(1.05)',
                cursor: 'pointer'
            }}
            onClick={handleCardClick}
        >
            <CardBody
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    height="150px"
                    width="100%"
                >
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${provider?.logo_path}`}
                        alt={provider?.provider_name}
                        objectFit="contain"
                        height="100%"
                        maxWidth="100%"
                        fallbackSrc="/placeholder.jpg"
                    />
                </Flex>

                <Stack spacing={2} mt="1.5rem" textAlign="center">
                    <Heading size="md" noOfLines={2}>
                        {provider?.provider_name}
                    </Heading>
                </Stack>
            </CardBody>
        </Card>
    );
};

export default ProviderCard;
