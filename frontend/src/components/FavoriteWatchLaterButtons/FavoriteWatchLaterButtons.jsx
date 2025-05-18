import { useState, useEffect, useContext } from 'react';
import { HStack, IconButton, Tooltip, Spinner } from '@chakra-ui/react';
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

import { AuthContext } from "../../context/AuthContext";
import AuthDialog from '../AuthDialog';

const FavoriteWatchLaterButtons = ({ id, name, imageURL, type, hideWatchLater }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);
    const [loadingFav, setLoadingFav] = useState(true);
    const [loadingWatchLater, setLoadingWatchLater] = useState(!hideWatchLater);
    const { isLoggedIn } = useContext(AuthContext);

    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const openAuthDialog = () => setIsAuthOpen(true);
    const onAuthClose = () => setIsAuthOpen(false);

    useEffect(() => {
        const fetchStatus = async () => {
            if (!id) return;

            try {
                setLoadingFav(true);
                const favStatus = await isInFavourites(id);
                setIsFavorite(favStatus);
            } catch (error) {
                console.error("Error checking favorite status:", error.message);
                setIsFavorite(false);
            } finally {
                setLoadingFav(false);
            }

            if (!hideWatchLater) {
                try {
                    setLoadingWatchLater(true);
                    const watchStatus = await isInWatchLater(id);
                    setIsWatchLater(watchStatus);
                } catch (error) {
                    console.error("Error checking watch later status:", error.message);
                    setIsWatchLater(false);
                } finally {
                    setLoadingWatchLater(false);
                }
            }
        };

        fetchStatus();
    }, [id, hideWatchLater, isLoggedIn]);

    const handleToggleFavorite = async () => {
        if (!isLoggedIn) {
            openAuthDialog();
            return;
        }

        try {
            setLoadingFav(true);
            if (isFavorite) {
                await removeFromFavorites(id);
            } else {
                await addToFavorites(id, name, imageURL, type);
            }
            setIsFavorite(prev => !prev);
        } catch (error) {
            console.error("Error toggling favorite:", error.message);
        } finally {
            setLoadingFav(false);
        }
    };

    const handleToggleWatchLater = async () => {
        if (!isLoggedIn) {
            openAuthDialog();
            return;
        }

        try {
            setLoadingWatchLater(true);
            if (isWatchLater) {
                await removeFromWatchLater(id);
            } else {
                await addToWatchLater(id, name, imageURL, type);
            }
            setIsWatchLater(prev => !prev);
        } catch (error) {
            console.error("Error toggling watch later:", error.message);
        } finally {
            setLoadingWatchLater(false);
        }
    };

    return (
        <>
            <HStack spacing={3}>
                <Tooltip label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
                    <IconButton
                        aria-label="Favorite"
                        icon={loadingFav ? <Spinner size="sm" /> : isFavorite ? <FaStar /> : <FaRegStar />}
                        onClick={handleToggleFavorite}
                        variant="ghost"
                        fontSize="2rem"
                        color='pink.400'
                        isDisabled={loadingFav}
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
                            icon={loadingWatchLater ? <Spinner size="sm" /> : isWatchLater ? <MdWatchLater /> : <MdOutlineWatchLater />}
                            onClick={handleToggleWatchLater}
                            variant="ghost"
                            fontSize="1.7rem"
                            color='yellow.300'
                            isDisabled={loadingWatchLater}
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

            <AuthDialog isOpen={isAuthOpen} onClose={onAuthClose} />
        </>
    );
};

export default FavoriteWatchLaterButtons;