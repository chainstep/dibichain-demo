import { Heading } from '@chakra-ui/react';
import Layout from '../components/commons/Layout';
import Page from '../components/commons/Page';

import Header from '../components/commons/Header';
import { COMPANY_NAME } from '../constants';
import Footer from '../components/commons/Footer';

const IndexPage: React.FC = () => {
  return (
    <Page>
      <Layout>
        <Header />

        <Heading textAlign='center'>HELLO {COMPANY_NAME}</Heading>
        <Footer></Footer>
      </Layout>
    </Page>
  );
};

export default IndexPage;
