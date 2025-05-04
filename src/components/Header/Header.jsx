import logoWithText from "../../common/images/logoWithText.png"
import { HOME_PAGE, MOVIES_PAGE, SHOWS_PAGE, PEOPLE_PAGE, PROVIDERS_PAGE } from "../../common/routes"
import {
  Flex,
  Link as ChakraLink,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"
import { NavLink as RouterLink, useNavigate } from "react-router-dom"
import {
  headerStyles, logoStyles, inputGroupStyles, accountIcon, inputStyles, searchIconStyles, navStyles, navLinkStyles, active, hidden
} from "./Header.theme"
import { useState, useEffect } from "react"
import useScrollListener from "../../hooks/useScrollListener"
import { FaUserCircle } from "react-icons/fa"

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('')
  const [show, setShow] = useState(true);
  const scroll = useScrollListener();

  useEffect(() => {
    if (scroll.y > 200 && scroll.y - scroll.lastY > 0)
      setShow(false);
    else
      setShow(true);
  }, [scroll.y, scroll.lastY]);

  const handleChange = (e) => setSearchQuery(e.target.value)
  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search-results/${searchQuery}`)
    }
  }
  const handleEnter = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      navigate(`/search-results/${searchQuery}`)
    }
  }

  return (
    <Flex
      {...headerStyles}
      style={show ? { ...active } : { ...hidden }}
      justify="space-between"
      align="center"
      px={4}>
      <ChakraLink
        as={RouterLink}
        to={HOME_PAGE}
        variant='navLink'
        {...logoStyles}
      >
        <img src={logoWithText} alt="Logo" />
      </ChakraLink>

      <Flex {...navStyles}>
        <li>
          <ChakraLink
            as={RouterLink}
            to={MOVIES_PAGE}
            variant='navLink'
            {...navLinkStyles}
            _activeLink={{ color: "main.100" }}
          >MOVIES</ChakraLink>
        </li>
        <li>
          <ChakraLink
            as={RouterLink}
            to={SHOWS_PAGE}
            variant='navLink'
            {...navLinkStyles}
            _activeLink={{ color: "main.100" }}
          >SHOWS</ChakraLink>
        </li>
      </Flex>

      <Flex flex="1" minW="200px" justify="center" px={2}>
        <InputGroup {...inputGroupStyles} maxW="400px" width="100%">
          <Input
            {...inputStyles}
            onChange={handleChange}
            value={searchQuery}
            onKeyDown={handleEnter}
            placeholder="Search for movies, TV shows..."
          />
          <InputRightElement>
            <Search2Icon
              {...searchIconStyles}
              onClick={handleSearch}
            />
          </InputRightElement>
        </InputGroup>
      </Flex>

      <Flex {...navStyles}>
        <li>
          <ChakraLink
            as={RouterLink}
            to={PEOPLE_PAGE}
            variant='navLink'
            {...navLinkStyles}
            _activeLink={{ color: "main.100" }}
          >PEOPLE</ChakraLink>
        </li>
        <li>
          <ChakraLink
            as={RouterLink}
            to={PROVIDERS_PAGE}
            variant='navLink'
            {...navLinkStyles}
            _activeLink={{ color: "main.100" }}
          >PROVIDERS</ChakraLink>
        </li>
      </Flex>

      <Menu>
        <Box
          display={{ base: 'block', sm: 'none' }}
          position="absolute"
          top="2rem"
          right="2rem"
          zIndex="300"
        >
          <MenuButton
            as={IconButton}
            icon={<FaUserCircle />}
            variant="ghost"
            color="main.100"
            {...accountIcon}
            _hover={{ color: "main.200" }}
          />
          <MenuList>
            <MenuItem _hover={{ bg: "main.100" }} onClick={() => navigate('/favourties')} fontSize='24px'>Favorites</MenuItem>
            <MenuItem _hover={{ bg: "main.100" }} onClick={() => navigate('/watchlist')} fontSize='24px'>Watchlist</MenuItem>
          </MenuList>
        </Box>

        <Box display={{ base: 'none', sm: 'block' }}>
          <MenuButton
            as={IconButton}
            icon={<FaUserCircle />}
            variant="ghost"
            color="main.100"
            {...accountIcon}
            _hover={{ color: "main.200" }}
          />
          <MenuList minW="120px" w="120px">
            <MenuItem _hover={{ bg: "main.100" }} onClick={() => navigate('/favourites')} fontSize='24px'>Favorites</MenuItem>
            <MenuItem _hover={{ bg: "main.100" }} onClick={() => navigate('/watchlist')} fontSize='24px'>Watchlist</MenuItem>
          </MenuList>
        </Box>
      </Menu>
    </Flex>
  )
}

export default Header