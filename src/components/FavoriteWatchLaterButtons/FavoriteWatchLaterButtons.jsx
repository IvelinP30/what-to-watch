import { useState } from 'react';
import { HStack, IconButton, Tooltip } from '@chakra-ui/react';
import { FaStar, FaRegStar, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const FavoriteWatchlistButtons = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchlist, setIsWatchlist] = useState(false);

    const handleToggleFavorite = () => {
        setIsFavorite(prev => !prev);
    };

    const handleToggleWatchlist = () => {
        setIsWatchlist(prev => !prev);
    };

    return (
        <HStack spacing={3}>
        <Tooltip label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
            <IconButton
            aria-label="Favorite"
            icon={isFavorite ? <FaStar /> : <FaRegStar />}
            onClick={handleToggleFavorite}
            variant="ghost"
            fontSize="2rem"
            color='pink.400'
            _hover={{
                color: 'pink.300',
                boxShadow: '0 0 10px rgba(255, 105, 180, 0.6)',
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease-in-out',
            }}
            />
        </Tooltip>

        <Tooltip label={isWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}>
            <IconButton
            aria-label="Watchlist"
            icon={isWatchlist ? <FaBookmark /> : <FaRegBookmark />}
            onClick={handleToggleWatchlist}
            variant="ghost"
            fontSize="1.7rem"
            color='yellow.300'
            _hover={{
                color: 'yellow.200',
                boxShadow: '0 0 10px rgba(255, 255, 100, 0.5)',
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease-in-out',
            }}
            />
        </Tooltip>
        </HStack>
    );
};

export default FavoriteWatchlistButtons;
