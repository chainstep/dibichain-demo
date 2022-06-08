import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
      },
    },
  },
  fonts: {
    body: '\'Open Sans\', sans-serif',
    heading: ''
  },
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: '', // Normally, it is "semibold"
      },
    },
    Heading: {
      baseStyle: {
        color: ''
      }
    }
  },
  colors: {
    orange: {
     500: '#E39183',
    },
    blue: {
      500: '#160045',
      600: '#160045',
     }
  },
  shadows: {
    outline: ''
  }
});

export default theme;