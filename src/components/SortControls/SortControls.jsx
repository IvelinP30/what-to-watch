import { Flex, Text } from "@chakra-ui/react"

const SortControlls = ({setPageNumber, setCurrentItems, setItemsSort, itemsSort}) => {

    const changeSortOrder = (e) => {
        if (e.target.id !== itemsSort) {
            setItemsSort(e.target.id);
            setPageNumber(1);
            setCurrentItems([]);
        }
    }

    return (
        <Flex gap='0.4rem'>
            <Text fontSize='1.1rem'>Sort by:</Text>
            <Flex gap='0.5rem' onClick={(e) => changeSortOrder(e)}>
                <Text fontSize='1.1rem' style={itemsSort === 'popularity.desc' ? { 'color': 'red', 'fontWeight': 'bold' } : { 'color': 'darkgray' }} cursor='pointer' id='popularity.desc' _hover={{ textDecoration: itemsSort !== 'popularity.desc' ? 'underline' : 'none' }}>Popular</Text>
                <Text fontSize='1.1rem' style={itemsSort === 'vote_average.desc' ? { 'color': 'red', 'fontWeight': 'bold' } : { 'color': 'darkgray' }} cursor='pointer' id='vote_average.desc' _hover={{ textDecoration: itemsSort !== 'vote_average.desc' ? 'underline' : 'none' }}>Top</Text>
                <Text fontSize='1.1rem' style={itemsSort === 'primary_release_date.desc' ? { 'color': 'red', 'fontWeight': 'bold' } : { 'color': 'darkgray' }} cursor='pointer' id='primary_release_date.desc' _hover={{ textDecoration: itemsSort !== 'primary_release_date.desc' ? 'underline' : 'none' }}>New</Text>
            </Flex>
        </Flex>
    )
}

export default SortControlls