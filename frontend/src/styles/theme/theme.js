import { extendTheme } from '@chakra-ui/react';
import colors from './colors.theme';
import breakpoints from './breakpoints.theme';

const theme = extendTheme({
  colors,
  fonts: {
    heading: "'Bebas Neue', sans-serif",
    body: "'Roboto', sans-serif",
  },
  breakpoints,
  styles: {
    global: {
      'h1, h2, h3, h4, h5, button, a': {
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '2.1rem'
      },
      'p, span': {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '1.25rem'
      },
      'input::placeholder': {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '1.25rem'
      },
      '::-webkit-scrollbar': {
        width: "10px"
      },
      '::-webkit-scrollbar-track': {
        background: 'main.100'
      },
      '::-webkit-scrollbar-thumb': {
        background: 'main.200',
        borderRadius: '50px'
      }
    }
  }
});

export default theme;
