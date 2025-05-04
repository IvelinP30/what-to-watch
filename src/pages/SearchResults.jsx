import { Flex, Text, Button, Box, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSearch } from "../services/data"
import { buttonStyles } from "../components/Hero/Hero.theme"
import SearchResultsGrid from "../components/Search/SearchResultsGrid"

const SearchResults = () => {
    const { searchQuery } = useParams();

    const [currentItems, setCurrentItems] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [noResults, setNoResults] = useState(false);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setCurrentItems([]);
        setPageNumber(1);
        setNoResults(false);
        setHasMorePages(true);
        loadNextPage(1, true);
    }, [searchQuery]);

    const loadNextPage = async (page = pageNumber, isFirstLoad = false) => {
        if (isLoading || !hasMorePages) return;

        setIsLoading(true);

        const searchData = await getSearch(searchQuery, page);

        if (searchData.success === false) {
            setCurrentItems([]);
            setNoResults(true);
            setHasMorePages(false);
            setIsLoading(false);
            return;
        }

        const filteredResults = searchData.results.filter(item => {
            if (item.media_type === 'movie' || item.media_type === 'tv') {
                return item.vote_count >= 300;
            } else if (item.media_type === 'person') {
                return item.popularity > 0.5;
            }
            return false;
        });

        if (filteredResults.length === 0 && (page === 1 || currentItems.length === 0)) {
            setNoResults(true);
        }

        setCurrentItems(prev => isFirstLoad ? filteredResults : [...prev, ...filteredResults]);

        if (page >= searchData.total_pages || currentItems.length + filteredResults.length >= 120) {
            setHasMorePages(false);
        } else {
            setPageNumber(prev => prev + 1);
        }

        setIsLoading(false);
    }

    return (
        <Flex position='relative' overflow='hidden'>
            <Box
                position='absolute'
                top='-30%'
                right='-50%'
                backgroundColor='background.200'
                borderRadius='50% 0% 0% 100% / 0% 0% 0% 100%'
                width='100%'
                height='100%'
                zIndex='0'
            />
            <Flex
                backgroundColor='background.100'
                flexDirection='row'
                height='100%'
                justifyContent='center'
                minHeight='100vh'
                minWidth='100vw'
            >
                <Flex
                    flexDirection='column'
                    position='relative'
                    margin={{ base: '14.5rem 1rem 1rem 1rem', lg: '11.375rem 2rem 2rem 2rem' }}
                    color='#fff'
                    width={{ base: '100%', lg: '80%' }}
                >
                    <Text as='h1' fontSize={{ base: '3xl', lg: '5xl' }} mb="1rem" fontWeight='bold'>
                        Search Results:
                    </Text>

                    <SearchResultsGrid
                        currentItems={currentItems}
                        noResults={currentItems.length === 0 && noResults}
                    />

                    {currentItems.length > 0 && (
                        <Flex flexDirection="column" alignItems="center">
                            <Button
                                {...buttonStyles}
                                width='10rem'
                                margin='2rem 0'
                                isDisabled={!hasMorePages || isLoading}
                                onClick={() => loadNextPage()}
                            >
                                <Text zIndex='1' color='#fff'>
                                    {isLoading
                                        ? 'Loading...'
                                        : hasMorePages
                                            ? 'Load More'
                                            : 'No More Results'}
                                </Text>
                            </Button>

                            {isLoading && (
                                <Spinner
                                    size="lg"
                                    color="main.100"
                                    thickness="4px"
                                    speed="0.6s"
                                />
                            )}
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default SearchResults;
