import { Flex, IconButton, Link, Tooltip } from '@chakra-ui/react';
import {
    FaImdb,
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaWikipediaW,
    FaHome
} from 'react-icons/fa';

const SOCIAL_LINKS = [
    {
        id: 'imdb_id',
        label: 'IMDb',
        icon: FaImdb,
        url: (id) => `https://www.imdb.com/title/${id}`
    },
    {
        id: 'facebook_id',
        label: 'Facebook',
        icon: FaFacebook,
        url: (id) => `https://www.facebook.com/${id}`
    },
    {
        id: 'instagram_id',
        label: 'Instagram',
        icon: FaInstagram,
        url: (id) => `https://www.instagram.com/${id}`
    },
    {
        id: 'twitter_id',
        label: 'Twitter',
        icon: FaTwitter,
        url: (id) => `https://www.twitter.com/${id}`
    },
    {
        id: 'wikidata_id',
        label: 'Wikidata',
        icon: FaWikipediaW,
        url: (id) => `https://www.wikidata.org/wiki/${id}`
    },
];

const SocialLinks = ({ externalIds, homepage }) => {
    return (
        <Flex gap="20px" wrap="wrap">
            {homepage && (
                <Tooltip label="Homepage" hasArrow>
                    <Link href={homepage} isExternal>
                        <IconButton
                            icon={<FaHome />}
                            aria-label="Homepage"
                            variant="ghost"
                            size="xl"
                            color="white"
                            _hover={{ color: 'teal.400' }}
                        />
                    </Link>
                </Tooltip>
            )}

            {SOCIAL_LINKS.map(({ id, label, icon: Icon, url }) => {
                const value = externalIds?.[id];
                if (!value) return null;

                return (
                    <Tooltip label={label} hasArrow key={id}>
                        <Link href={url(value)} isExternal>
                            <IconButton
                                icon={<Icon />}
                                aria-label={label}
                                variant="ghost"
                                size="xl"
                                color="white"
                                _hover={{ color: 'teal.400' }}
                            />
                        </Link>
                    </Tooltip>
                );
            })}
        </Flex>
    );
};

export default SocialLinks;
