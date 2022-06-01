import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: '#17243E',
      },
    },
  },
  fonts: {
    body: 'Montserrat',
    heading: 'Automate'
  },
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: 'bold', // Normally, it is "semibold"
      },
    },
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
    outline: '0 0 0 2px #EC6746;'
  }
});

export default theme;
