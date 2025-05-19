import { Box, Container, Text, Link, Flex } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box bg="gray.900" color="white" py={8}>
            <Container maxW="container.xl">
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    justify="space-between"
                    align="center"
                    gap={6}
                    wrap="wrap"
                    width="100%"
                    p="25px 20%"
                >

                    <Flex direction={{ base: 'column', md: 'column', lg: 'row' }} gap={{ base: '4' }} justifyContent="space-between" alignItems={{ base: 'center', md: "center" }} width="100%" mt="20px" >
                        <Link href="/home" _hover={{ textDecoration: 'underline', color: 'main.100' }}>
                            Home
                        </Link>
                        <Link href="/movies" _hover={{ textDecoration: 'underline', color: 'main.100' }}>
                            Movies
                        </Link>
                        <Link href="/shows" _hover={{ textDecoration: 'underline', color: 'main.100' }}>
                            Shows
                        </Link>
                        <Link href="/people" _hover={{ textDecoration: 'underline', color: 'main.100' }}>
                            People
                        </Link>
                        <Link href="/providers" _hover={{ textDecoration: 'underline', color: 'main.100' }}>
                            Providers
                        </Link>
                    </Flex>
                </Flex>

                <Box mt="25px" textAlign="center">
                    <Text fontSize="sm" mb={2}>
                        &copy; {new Date().getFullYear()} WhatToWatch. All rights reserved.
                    </Text>
                    <Text fontSize="sm" mt="2" color="gray.400">
                        Powered by{' '}
                        <Link href="https://www.themoviedb.org" isExternal fontSize="lg" color="teal.400" _hover={{ textDecoration: 'underline' }}>
                            TMDb
                        </Link>
                    </Text>

                    <Text fontSize="sm" mt="2" color="gray.400">
                        Check out the source code on{' '}
                        <Link href="https://github.com/IvelinP30/what-to-watch" isExternal fontSize="lg" color="main.100" _hover={{ textDecoration: 'underline' }}>
                            GitHub
                        </Link>
                    </Text>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
