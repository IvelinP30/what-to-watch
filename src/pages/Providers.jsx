import {
    Flex,
    Text,
    Box,
    InputGroup,
    Input,
    InputRightElement
} from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"
import { useEffect, useState } from "react"
import { getMoviesWatchProviders, getShowsWatchProviders } from "../services/data"
import ProvidersGrid from "../components/Providers/ProvidersGrid"

const Providers = () => {
    const [allProviders, setAllProviders] = useState([]);
    const [filteredProviders, setFilteredProviders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const [moviesData, showsData] = await Promise.all([
                    getMoviesWatchProviders(),
                    getShowsWatchProviders()
                ]);

                const combined = [
                    ...(moviesData?.results || []),
                    ...(showsData?.results || [])
                ];

                const uniqueByName = Array.from(
                    new Map(combined.map(p => [p.provider_name, p])).values()
                );

                const sortedProviders = uniqueByName
                    .filter(provider => provider.display_priorities?.US)
                    .sort((a, b) => {
                        const priorityA = a.display_priorities["US"] ?? a.display_priority;
                        const priorityB = b.display_priorities["US"] ?? b.display_priority;
                        return priorityA - priorityB;
                    });

                setAllProviders(sortedProviders);
                setFilteredProviders(sortedProviders);
            } catch (error) {
                console.error("Failed to fetch providers:", error);
                setAllProviders([]);
                setFilteredProviders([]);
            }
        };

        fetchProviders();
    }, []);

    const runSearch = () => {
        const trimmed = searchQuery.trim().toLowerCase();
        const filtered = allProviders.filter(provider =>
            provider.provider_name.toLowerCase().includes(trimmed)
        );
        setFilteredProviders(filtered);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            runSearch();
        }
    };

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Flex
            backgroundColor='background.100'
            flexDirection='row'
            height='100%'
            position='relative'
            justifyContent="center"
            overflow="hidden"
        >
            <Box
                position='absolute'
                top='0'
                right='-20%'
                backgroundColor='background.200'
                borderRadius='30% 70% 70% 30% / 30% 30% 70% 70%'
                width='100%'
                height='100%'
                zIndex='0'
                minHeight='200vh'
            />

            <Flex
                flexDirection='column'
                position='relative'
                margin={{ base: '25rem 1rem 1rem 1rem', lg: '13rem 2rem 2rem 2rem' }}
                color='#fff'
                width={{ base: '100%', lg: '80%' }}
            >
                <Text as='h1' fontSize={{ base: '3xl', lg: '3.5rem' }} fontWeight='bold'>
                    Top Streaming Providers for Movies & TV Shows
                </Text>
                <Text as="p" fontSize={{ base: 'lg', lg: 'xl' }} color="gray.300" marginBottom="40px">
                    Explore the best platforms to stream your favorite movies and TV shows. Find where to watch the latest releases and timeless classics!
                </Text>

                <Flex flex="1" minW="200px" justify="center" px={2} mb={5} mt={5}>
                    <InputGroup maxW="400px" width="100%">
                        <Input
                            variant='filled'
                            value={searchQuery}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Search providers..."
                            bg="whiteAlpha.200"
                            _placeholder={{ color: 'gray.400' }}
                            color="white"
                            _hover={{
                                bg: "whiteAlpha.300",
                                borderColor: "gray.500"
                            }}
                            _focus={{
                                borderColor: "gray.300",
                                boxShadow: "0 0 0 1px #1a202c"
                            }}
                        />

                        <InputRightElement
                            cursor="pointer"
                            onClick={runSearch}
                            _hover={{
                                bg: "whiteAlpha.300",
                                color: "white"
                            }}
                        >
                            <Search2Icon color="gray.400" />
                        </InputRightElement>
                    </InputGroup>
                </Flex>

                <Text as='p' fontSize="1rem" color='#BEBEBE' mb="1rem">
                    Results: <strong>{filteredProviders.length}</strong> items
                </Text>

                <ProvidersGrid providers={filteredProviders} />
            </Flex>
        </Flex>
    );
};

export default Providers;