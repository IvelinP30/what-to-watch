import { Flex, Text, Button, Box, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getPeople } from "../services/data"
import { buttonStyles } from "../components/Hero/Hero.theme"
import PeopleGrid from "../components/People/PeopleGrid"
import PeopleFilterControls from "../components/People/PeopleFilterControls"

const People = () => {
    const [currentPeople, setCurrentPeople] = useState([]);
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const [nextPageToUse, setNextPageToUse] = useState(1);
    const [noResults, setNoResults] = useState(false);
    const [peopleFilter, setPeopleFilter] = useState({ genders: [], departments: [] });
    const [seenIds, setSeenIds] = useState(new Set());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPeople = async () => {
            setLoading(true);
            const result = await getPeople(1, peopleFilter, 5, new Set());
            if (result.success) {
                setCurrentPeople(result.people);
                setNumberOfPeople(result.totalPeople);
                setNoResults(result.people.length === 0);
                setNextPageToUse(result.nextPageToUse);
                setSeenIds(new Set(result.people.map(p => p.id)));
            } else {
                setCurrentPeople([]);
                setNoResults(true);
            }
            setLoading(false);
        };

        fetchPeople();
    }, [peopleFilter]);

    const loadNextPage = async () => {
        setLoading(true);
        const result = await getPeople(nextPageToUse, peopleFilter, 5, new Set(seenIds));
        if (result.success) {
            setCurrentPeople(prev => [...prev, ...result.people]);
            setNextPageToUse(result.nextPageToUse);
            setSeenIds(prev => {
                const updated = new Set(prev);
                result.people.forEach(p => updated.add(p.id));
                return updated;
            });
        }
        setLoading(false);
    };

    return (

        <Flex
            backgroundColor='background.100'
            flexDirection='row'
            height='100%'
            position='relative'
        >

            <Box
                position='absolute'
                top='0'
                right='-20%'
                backgroundColor='background.200'
                borderRadius='30% 70% 70% 30% / 30% 30% 70% 70% '
                width='100%'
                height='100%'
                zIndex='0'
                minHeight='200vh'
            />

            {currentPeople.success !== false ?
                <>
                    <PeopleFilterControls
                        setPageNumber={setNextPageToUse}
                        setCurrentPeople={setCurrentPeople}
                        setPeopleFilter={setPeopleFilter}
                    />

                    <Flex flexDirection='column' position='relative' margin={{ base: '25rem 1rem 1rem 1rem', lg: '13rem 2rem 2rem 2rem' }} color='#fff' width={{ base: '100%', lg: '80%' }}>
                        <Text as='h1' fontSize={{ base: '3xl', lg: '3.5rem' }} fontWeight='bold'>
                            Popular People in Film & TV
                        </Text>
                        <Text as="p" fontSize={{ base: 'lg', lg: 'xl' }} color="gray.300" marginBottom="40px">
                            Explore the most talked-about actors, directors, and creators dominating the entertainment world right now.
                        </Text>
                        <PeopleGrid
                            currentPeople={currentPeople}
                            noResults={noResults}
                        />
                        {(currentPeople.length > 0 && loading) && (
                            <Flex justify="center" my={10}>
                                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="main.100" size="xl" />
                            </Flex>
                        )}
                        {(currentPeople.length > 0 && !loading) && (
                            <Button
                                {...buttonStyles}
                                width="10rem"
                                margin="2rem 0"
                                isDisabled={currentPeople.length === numberOfPeople}
                                onClick={() => loadNextPage()}
                            >
                                <Text zIndex="1" color="#fff">Load More</Text>
                            </Button>
                        )}
                    </Flex>
                </>
                :
                <Flex height='100vh' width='100vw' color='#fff' fontSize='3xl' justifyContent='center' alignItems='center'>
                    <Text>There was an error. Please try again.</Text>
                </Flex>
            }

        </Flex>
    )
}

export default People