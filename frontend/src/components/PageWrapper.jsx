import { Box, Heading, Flex, Icon } from '@chakra-ui/react';
import { FaStar, FaInfo } from 'react-icons/fa';
import { MdWatchLater } from 'react-icons/md';

const iconConfig = {
    favorites: { icon: FaStar, color: 'pink.400' },
    watchLater: { icon: MdWatchLater, color: 'yellow.300' },
    accountInfo: { icon: FaInfo, color: 'main.100' },
};

const PageWrapper = ({ title, children, largeTitle = false, iconType = 'favorites' }) => {
    const { icon, color } = iconConfig[iconType] || iconConfig['favorites'];

    return (
        <Box p={6}>
            <Flex align="center" mb={2} alignItems="baseline">
                <Icon
                    as={icon}
                    color={color}
                    boxSize={largeTitle ? { base: '30px', lg: '55px' } : '35px'}
                    mr="1rem"
                />
                <Heading
                    as="h1"
                    fontSize={largeTitle ? { base: '4xl', lg: '3.5rem' } : '2xl'}
                    fontWeight="bold"
                >
                    {title}
                </Heading>
            </Flex>
            {children}
        </Box>
    );
};

export default PageWrapper;