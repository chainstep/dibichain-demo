import { ChakraProvider } from '@chakra-ui/react';
import SafeHydrate from '../components/commons/SafeHydrate';
import theme from '../style/theme';
import '../style/theme.scss';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App({ Component, pageProps }) {
    return (
        <SafeHydrate>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </SafeHydrate>
    );
}

export default App;
