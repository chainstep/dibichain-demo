import {
  Button,
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import Layout from '../components/commons/Layout';
import Page from '../components/commons/Page';

import Header from '../components/commons/Header';
import Footer from '../components/commons/Footer';
import {
  MyProductDetailsRequest,
  Product,
  ProductDetailsRequest,
} from '../../types';
import {
  getMyProductDetailsRequest,
  getProductDetailsRequest,
  postMyProductDetailsRequest,
  postMyProductDetailsResponse,
} from '../api/product-details';

const MyProductsPage: React.FC = () => {
  const [productDetailsRequests, setProductDetailsRequests] = useState([
  ] as ProductDetailsRequest[]);
  const [myProductDetailsRequests, setMyProductDetailsRequests] = useState([
  ] as MyProductDetailsRequest[]);

  useEffect(() => {
    getProductDetailsRequest().then(({ data }) => setProductDetailsRequests(data.productDetailsRequests));
    getMyProductDetailsRequest().then(({ data }) => setMyProductDetailsRequests(data.myProductDetailsRequests));
  }, []);

  useInterval(() => {
    getProductDetailsRequest().then(({ data }) => setProductDetailsRequests(data.productDetailsRequests));
    getMyProductDetailsRequest().then(({ data }) => setMyProductDetailsRequests(data.myProductDetailsRequests));
  }, 10000);

  const onButtonClick = (productDetailsRequest: ProductDetailsRequest) => {
    postMyProductDetailsResponse(productDetailsRequest).then(res =>
      console.log(res)
    );
  };

  return (
    <Page>
      <Layout>
        <Header />

        <Container maxW='container.xl'>
          <Heading mb={12} textAlign='center'>
            My Product Details Requests
          </Heading>

          {myProductDetailsRequests.length === 0 ? (
            <Heading size='md' mb={12} textAlign='center'>
              No product details requests
            </Heading>
          ) : (
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>UID</Th>
                    <Th>Timestamp</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {myProductDetailsRequests.map(request => (
                    <Tooltip placement='top' hasArrow label={request.publicKey}>
                      <Tr key={request.uid}>
                        <Td>{request.uid}</Td>
                        <Td>{request.timestamp}</Td>
                      </Tr>
                    </Tooltip>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Container>

        <div style={{ height: '100px' }}></div>

        <Container maxW='container.xl'>
          <Heading mb={12} textAlign='center'>
            Product Details Requests
          </Heading>

          {productDetailsRequests.length === 0 ? (
            <Heading size='md' mb={12} textAlign='center'>
              No product details requests
            </Heading>
          ) : (
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>UID</Th>
                    <Th>Timestamp</Th>
                    <Th>Responded</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {productDetailsRequests.map(request => (
                    <Tooltip placement='top' hasArrow label={request.publicKey}>
                      <Tr key={request.uid}>
                        <Td>{request.uid}</Td>
                        <Td>{request.timestamp}</Td>
                        <Td>{request.responded.toString()}</Td>
                        <Td>
                          <Button
                            mr={2}
                            colorScheme='red'
                            onClick={() => console.log('Declined')}
                          >
                            Decline
                          </Button>
                          <Button
                            colorScheme='green'
                            onClick={() => onButtonClick(request)}
                          >
                            Approve
                          </Button>
                        </Td>
                      </Tr>
                    </Tooltip>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Container>

        <Footer></Footer>
      </Layout>
    </Page>
  );
};

export default MyProductsPage;
