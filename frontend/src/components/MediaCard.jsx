import { Card, Image, Text, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const MediaCard = ({ itemId, name, imageURL, type, onRemove }) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.stopPropagation();
        navigate(`/${type.toLowerCase()}/details/${itemId}`);
    };

    return (
        <Card
            maxWidth="250px"
            minWidth="250px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            _hover={{ boxShadow: 'lg' }}
            bg="gray.800"
            cursor="pointer"
            onClick={handleClick}
            position="relative"
        >
            <Image
                src={`https://image.tmdb.org/t/p/original/${imageURL}`}
                alt={name}
                objectFit="cover"
                objectPosition="center center"
                filter="brightness(80%)"
                width="100%"
                height="300px"
                transition="transform .5s"
                _hover={{ transform: 'scale(1.05)' }}
                fallbackSrc="/placeholder.jpg"
            />
            <VStack spacing={2} p={3} bg="rgba(0,0,0,0.6)" width="100%" position="absolute" bottom="0">
                <Text
                    fontWeight="bold"
                    fontSize="lg"
                    textAlign="center"
                    color="white"
                    noOfLines={1}
                >
                    {name}
                </Text>
                <Button
                    colorScheme="red"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                >
                    Remove
                </Button>
            </VStack>
        </Card>
    );
};

export default MediaCard;
