import { Flex, Box } from "@chakra-ui/react"

const Logo = () => {
  return (
    <Flex  color='black' padding='5px' borderRadius='10%' width='100px' fontWeight='bold'>
        <Flex flexDirection='column' > 
            <Box>WHAT</Box>
            <Box marginTop='-7px'>MOVIE</Box>
            <Box marginTop='-7px'>TO</Box>
            <Box marginTop='-7px'>WATCH</Box>
        </Flex>
        <Box fontSize='6xl'>
            ?
        </Box>
    </Flex>
  )
}

export default Logo