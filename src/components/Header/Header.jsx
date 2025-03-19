import logoWithText from "../../common/images/logoWithText.png"
import { HOME_PAGE } from "../../common/routes"
import { Flex, Link as ChakraLink, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"
import { NavLink as RouterLink, useNavigate } from "react-router-dom"
import { headerStyles, logoStyles, inputGroupStyles, inputStyles, searchIconStyles, navStyles, navLinkStyles, active, hidden} from "./Header.theme"
import { useState, useEffect } from "react"
import useScrollListener from "../../hooks/useScrollListener"

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('')
  const [show, setShow] = useState(true);
  const scroll = useScrollListener();
  useEffect(() => {
    if(scroll.y > 200 && scroll.y - scroll.lastY > 0)
      setShow(false);
    else
      setShow(true);

  }, [scroll.y, scroll.lastY]);

  const handleChange = (e) => setSearchQuery(e.target.value)

  const handleSearch = () =>{
    if(searchQuery.trim() !== ''){
      navigate(`/search-results/${searchQuery}`)
    }
  }

  const handleEnter = (e) =>{
    if (e.key === 'Enter' && searchQuery.trim() !== ''){
      navigate(`/search-results/${searchQuery}`)
    }
  }
  
  return (
    <Flex 
      {...headerStyles}
      style={show ? {...active} : {...hidden}}
    >
      <ChakraLink
        as={RouterLink}
        to={HOME_PAGE}
        variant= 'navLink'
        {...logoStyles}
      ><img src={logoWithText}/>
      </ChakraLink>
      <InputGroup {...inputGroupStyles}>
        <Input {...inputStyles} 
          onChange={handleChange}
          value={searchQuery}
          onKeyDown={handleEnter}
          />
        <InputRightElement>
          <Search2Icon 
            {...searchIconStyles}
            onClick={() => handleSearch()}
            />
        </InputRightElement>
      </InputGroup>
      <Flex 
        {...navStyles}
        >
        <li>
          <ChakraLink
            as={RouterLink}
            to='/movies'
            variant='navLink'
            {...navLinkStyles}
            _activeLink={{ color: "main.100" }}
          >MOVIES</ChakraLink>
        </li>
        <li>
          <ChakraLink
            as={RouterLink}
            to='/shows'
            variant='navLink'
            {...navLinkStyles}
            _activeLink={{ color: "main.100" }}
          >SHOWS</ChakraLink>
        </li>
      </Flex>
    </Flex>
  )
}

export default Header