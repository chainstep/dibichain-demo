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
        <div style={{ flex: '1 0 auto' }}>
          <Header />

          <Heading p={10} textAlign='center'>
            HELLO {COMPANY_NAME}
          </Heading>
        </div>

        <div style={{ flexShrink: '0' }}>
          <Footer></Footer>
        </div>
      </Layout>
    </Page>
  );
};

export default IndexPage;
