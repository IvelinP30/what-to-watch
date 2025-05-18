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
  MenuItem,
  useToast
} from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"
import { NavLink as RouterLink, useNavigate } from "react-router-dom"
import {
  headerStyles, logoStyles, inputGroupStyles, accountIcon, inputStyles, searchIconStyles, navStyles, navLinkStyles, active, hidden
} from "./Header.theme"
import { useState, useEffect, useContext } from "react"
import useScrollListener from "../../hooks/useScrollListener"
import { FaUserCircle, FaStar, FaSignOutAlt, FaSignInAlt } from "react-icons/fa"
import { MdWatchLater } from "react-icons/md";
import { logout } from "../../services/auth"
import LogoutConfirmationDialog from "../LogoutConfirmationDialog";
import { useDisclosure } from "@chakra-ui/react";
import AuthDialog from "../AuthDialog";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('')
  const [show, setShow] = useState(true);
  const scroll = useScrollListener();
  const { user } = useContext(AuthContext);

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
  const { isOpen: isAuthOpen, onOpen: onAuthOpen, onClose: onAuthClose } = useDisclosure();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

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

  const handleLogout = async () => {
    const { success, error } = await logout();

    if (success) {
      setIsLoggedIn(false);
      toast({
        title: "Signed out successfully",
        status: "success",
        duration: 4000,
        isClosable: false,
      });
    } else {
      toast({
        title: "Sign out failed",
        description: error,
        status: "error",
        duration: 4000,
        isClosable: false,
      });
    }

    onDialogClose();
  };

  return (
    <Flex
      {...headerStyles}
      style={show ? { ...active } : { ...hidden }}
      justify="space-between"
      align="center"
      px={4}
      backdropFilter="blur(3px)">
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

      <Flex flex="0.7" minW="200px" justify="center" px={2}>
        <InputGroup {...inputGroupStyles} maxW="400px" width="100%">
          <Input
            {...inputStyles}
            onChange={handleChange}
            value={searchQuery}
            onKeyDown={handleEnter}
            placeholder="Search for movies, TV shows, people..."
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

      {isLoggedIn ? (
        <Menu>
          <Box
            display={{ base: 'block', sm: 'none' }}
            position="absolute"
            top="2rem"
            left="2rem"
            zIndex="300"
          >
            <Flex align="center">
              <MenuButton
                as={IconButton}
                icon={<FaUserCircle />}
                variant="ghost"
                color="main.100"
                zIndex={1}
                {...accountIcon}
                _hover={{ color: "main.200" }}
              />
              {user.name && (
                <Box
                  bg="main.100"
                  color="black"
                  fontWeight="medium"
                  fontSize="sm"
                  px={3}
                  py={1}
                  borderRadius="0px 20px 20px 0px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  maxW="150px"
                  ml='-10px'
                  zIndex={0}
                >
                  {user.name}
                </Box>
              )}
            </Flex>
            <MenuList minW="auto" w="auto" p={2}>
              <MenuItem
                borderRadius={8}
                _hover={{
                  bg: "main.100",
                  color: 'white',
                  transform: "scale(1.05)",
                  transition: 'all 0.3s ease-in-out',
                }}
                onClick={() => navigate('/Favorites')}
                fontSize='24px'
                icon={<FaStar />}
              >
                Favorites
              </MenuItem>
              <MenuItem
                borderRadius={8}
                _hover={{
                  bg: "main.100",
                  color: 'white',
                  transform: "scale(1.05)",
                  transition: 'all 0.3s ease-in-out',
                }}
                onClick={() => navigate('/watch-later')}
                fontSize='24px'
                icon={<MdWatchLater />}
              >
                Watch Later
              </MenuItem>
              <MenuItem
                borderRadius={8}
                _hover={{
                  bg: "main.100",
                  color: 'white',
                  transform: "scale(1.05)",
                  transition: 'all 0.3s ease-in-out',
                }}
                onClick={onDialogOpen}
                fontSize='24px'
                icon={<FaSignOutAlt />}
              >
                Sign Out
              </MenuItem>
            </MenuList>
          </Box>

          <Box display={{ base: 'none', sm: 'block' }}>
            <Flex align="center" mr={{ base: 0, md: '10px', lg: '20px' }} ml={{ base: 0, md: '10px', lg: '10px' }}>
              {user.name && (
                <Box
                  bg="main.100"
                  color="black"
                  fontWeight="medium"
                  fontSize="sm"
                  px={4}
                  py={0.5}
                  borderRadius="20px 0 0 20px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  maxW="150px"
                  mr='-10px'
                  zIndex={0}
                >
                  {user.name}
                </Box>
              )}
              <MenuButton
                as={IconButton}
                icon={<FaUserCircle />}
                variant="ghost"
                color="main.100"
                zIndex={1}
                {...accountIcon}
                _hover={{ color: "main.200" }}
              />
            </Flex>
            <MenuList minW="auto" w="auto" p={2}>
              <MenuItem
                borderRadius={8}
                _hover={{
                  bg: "main.100",
                  color: 'white',
                  transform: "scale(1.05)",
                  transition: 'all 0.3s ease-in-out',
                }}
                onClick={() => navigate('/Favorites')}
                fontSize='24px'
                icon={<FaStar />}
              >
                Favorites
              </MenuItem>
              <MenuItem
                borderRadius={8}
                _hover={{
                  bg: "main.100",
                  color: 'white',
                  transform: "scale(1.05)",
                  transition: 'all 0.3s ease-in-out',
                }}
                onClick={() => navigate('/watch-later')}
                fontSize='24px'
                icon={<MdWatchLater />}
              >
                Watch Later
              </MenuItem>
              <MenuItem
                borderRadius={8}
                _hover={{
                  bg: "main.100",
                  color: 'white',
                  transform: "scale(1.05)",
                  transition: 'all 0.3s ease-in-out',
                }}
                onClick={onDialogOpen}
                fontSize='24px'
                icon={<FaSignOutAlt />}
              >
                Sign Out
              </MenuItem>
            </MenuList>
          </Box>
        </Menu>
      ) : (
        <Box>
          <Flex
            display={{ base: 'block', sm: 'none' }}
            position="absolute"
            top="2rem"
            left="2rem"
            zIndex="300"
            align="center"
            onClick={onAuthOpen}
            _hover={{
              opacity: 0.8,
              transform: 'scale(0.95)',
              transition: 'all 0.2s ease-in-out'
            }}
            mt={2}
            {...navStyles}>
            <li>
              <ChakraLink color="main.100" fontSize="22px" variant='navLink' {...navLinkStyles}>
                Sign In
              </ChakraLink>
              <IconButton
                icon={<FaSignInAlt />}
                aria-label="Sign in"
                colorScheme="main"
                variant="solid"
                color="main.100"
                fontSize='20px'
                mb="1"
              />
            </li>
          </Flex>

          <Flex
            display={{ base: 'none', sm: 'block' }}
            align="center"
            onClick={onAuthOpen}
            _hover={{
              opacity: 0.8,
              transform: 'scale(0.95)',
              transition: 'all 0.2s ease-in-out'
            }}
            mt={2}
            {...navStyles}>
            <li>
              <ChakraLink color="main.100" fontSize="28px" variant='navLink' {...navLinkStyles}>
                Sign In
              </ChakraLink>
              <IconButton
                icon={<FaSignInAlt />}
                aria-label="Sign in"
                colorScheme="main"
                variant="solid"
                color="main.100"
                fontSize='23px'
                mb="2.5"
              />
            </li>
          </Flex>

          <AuthDialog isOpen={isAuthOpen} onClose={onAuthClose} />
        </Box>
      )
      }

      <LogoutConfirmationDialog
        isOpen={isDialogOpen}
        onClose={onDialogClose}
        onConfirm={handleLogout}
      />
    </Flex >
  )
}

export default Header