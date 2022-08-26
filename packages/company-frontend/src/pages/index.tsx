import { Heading, Link, Text } from '@chakra-ui/react';
import Layout from '../components/commons/Layout';
import Page from '../components/commons/Page';
import Footer from '../components/commons/Footer';
import Header from '../components/commons/Header';
import { COMPANY_NAME } from '../constants';


const IndexPage: React.FC = () => {
    return (
        <Page>
            <Layout>
                <div style={{ flex: '1 0 auto' }}>
                    <Header/>
                    <Heading pt={10} textAlign='center'>
                        Welcome to the Dibichain Demo
                    </Heading>
                    <Heading pt={3} size='md' textAlign='center'>
                        You are logged in to company  { COMPANY_NAME }
                    </Heading>
                    <Text align={'center'} pt={10}>
                        New here?
                        Have a look into the project{' '}
                        <Link
                            href='https://github.com/chainstep/dibichain-demo/blob/main/README.md'
                            isExternal
                            color="teal.500"
                        >
                            documentation
                        </Link>
                        .
                    </Text>
                </div>
                <div style={{ flexShrink: '0' }}>
                    <Footer/>
                </div>
            </Layout>
        </Page>
    );
};

export default IndexPage;
