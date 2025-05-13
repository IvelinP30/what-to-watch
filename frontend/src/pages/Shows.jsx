import { Flex, Text, Button, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getShows } from "../services/data.js"
import { buttonStyles } from "../components/Hero/Hero.theme"
import FilterControlls from "../components/FilterControls/FilterControls"
import SortControlls from "../components/SortControls/SortControls"
import MoviesGrid from "../components/MoviesGrid/MoviesGrid"

const Shows = () => {
    const currentYear = new Date().toJSON().slice(0, 4);

    const [currentShows, setCurrentShows] = useState([]);
    const [numberOfShows, setNumberOfShows] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [showsSort, setShowsSort] = useState('popularity.desc');
    const [showsFilter, setShowsFilter] = useState({ yearRange: [1901, currentYear], scoreRange: [0, 10], selectedGeneres: [] });
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const fetchShows = async () => {
            const showsData = await getShows(
                pageNumber,
                showsSort,
                showsFilter.yearRange[0],
                showsFilter.yearRange[1],
                showsFilter.scoreRange[0],
                showsFilter.scoreRange[1],
                showsFilter.selectedGeneres.join(',')
            )

            if (showsData.totalShows === 0) {
                setNoResults(true);
            } else {
                if (currentShows.length > 0) {
                    setCurrentShows(oldShowsList => [...oldShowsList, ...showsData.shows])
                } else {
                    setCurrentShows(showsData.shows)
                }
                setNoResults(false);
            }
            setNumberOfShows(showsData.totalShows)
        }


        fetchShows();


    }, [pageNumber, showsSort, showsFilter])

    const loadNextPage = () => {
        setPageNumber(currentPage => currentPage += 1)
    }




    return (
        <Flex
            backgroundColor='background.100'
            flexDirection='row'
            height='100%'
            position='relative'
            overflow='hidden'
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

            <FilterControlls
                setPageNumber={setPageNumber}
                setCurrentItems={setCurrentShows}
                setItemsFilter={setShowsFilter}

            />
            <Flex flexDirection='column' position='relative' margin={{ base: '25rem 1rem 1rem 1rem', lg: '13rem 2rem 2rem 2rem' }} color='#fff' width={{ base: '100%', lg: '80%' }}>
                <Text as='h1' fontSize={{ base: '3xl', lg: '3.5rem' }} fontWeight='bold'>The most popular TV Shows to watch</Text>
                <Text as="p" fontSize={{ base: 'lg', lg: 'xl' }} color="gray.300" marginBottom="40px">
                    Discover best TV Shows by sorting and filtering through ratings, release date, and genres.
                </Text>
                <Flex justifyContent='space-between' marginBottom='0.5rem' display='flex' alignItems='end'>
                    <Text as='p' style={{ 'fontSize': '1rem', 'color': '#BEBEBE' }}>Result: <span style={{ 'fontWeight': 'bold', 'fontSize': '1rem', }}>{numberOfShows}</span> TV Shows</Text>
                    <SortControlls
                        setPageNumber={setPageNumber}
                        setCurrentItems={setCurrentShows}
                        setItemsSort={setShowsSort}
                        itemsSort={showsSort}
                    />
                </Flex>
                <MoviesGrid
                    currentItems={currentShows}
                    noResults={noResults}
                    type={'tv'}
                />
                {currentShows.length > 0 && (
                    <Button
                        {...buttonStyles}
                        width="10rem"
                        margin="2rem 0"
                        isDisabled={currentShows.length === currentShows}
                        onClick={() => loadNextPage()}
                    >
                        <Text zIndex="1" color="#fff">Load More</Text>
                    </Button>
                )}
            </Flex>
        </Flex>
    )
}

export default Shows