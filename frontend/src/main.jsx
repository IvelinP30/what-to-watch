import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/reset.css';
import { ChakraProvider } from '@chakra-ui/react'
import theme from './styles/theme/theme.js'
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
