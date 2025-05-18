import { useState, useEffect } from 'react';
import { HStack, IconButton, Tooltip } from '@chakra-ui/react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md";

import {
    addToFavorites,
    removeFromFavorites,
    isInFavourites
} from '../../services/favourite';

import {
    addToWatchLater,
    removeFromWatchLater,
    isInWatchLater
} from '../../services/watchLater';

const FavoriteWatchLaterButtons = ({ id, name, imageURL, hideWatchLater }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchStatus = async () => {
            try {
                const favStatus = await isInFavourites(id);
                setIsFavorite(favStatus);
            } catch (error) {
                console.error("Error checking favorite status:", error.message);
                setIsFavorite(false);
            }

            if (!hideWatchLater) {
                try {
                    const watchStatus = await isInWatchLater(id);
                    setIsWatchLater(watchStatus);
                } catch (error) {
                    console.error("Error checking watch later status:", error.message);
                    setIsWatchLater(false);
                }
            }
        };

        fetchStatus(); 
    }, [id, hideWatchLater]);

    const handleToggleFavorite = async () => {
        try {
            if (isFavorite) {
                await removeFromFavorites(id);
            } else {
                await addToFavorites(id, name, imageURL);
            }
            setIsFavorite(prev => !prev);
        } catch (error) {
            console.error("Error toggling favorite:", error.message);
        }
    };

    const handleToggleWatchLater = async () => {
        try {
            if (isWatchLater) {
                await removeFromWatchLater(id);
            } else {
                await addToWatchLater(id, name, imageURL);
            }
            setIsWatchLater(prev => !prev);
        } catch (error) {
            console.error("Error toggling watch later:", error.message);
        }
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

            {!hideWatchLater && (
                <Tooltip label={isWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}>
                    <IconButton
                        aria-label="Watch Later"
                        icon={isWatchLater ? <MdWatchLater /> : <MdOutlineWatchLater />}
                        onClick={handleToggleWatchLater}
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
            )}
        </HStack>
    );
};

export default FavoriteWatchLaterButtons;