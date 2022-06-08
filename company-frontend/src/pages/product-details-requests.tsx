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
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { InfoIcon } from '@chakra-ui/icons';
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
  postMyProductDetailsResponse,
} from '../api/product-details';
import { getMyProducts } from '../api/products';

const MyProductsPage: React.FC = () => {
  const [productDetailsRequests, setProductDetailsRequests] = useState(
    [] as ProductDetailsRequest[]
  );
  const [myProductDetailsRequests, setMyProductDetailsRequests] = useState(
    [] as MyProductDetailsRequest[]
  );
  const [myProducts, setMyProducts] = useState([] as Product[]);
  const toast = useToast();

  useEffect(() => {
    getAllProductDetailsRequests();
    getMyProducts()
      .then(({ data }) => setMyProducts(data.myProducts))
      .catch(err => console.log(err));
  }, []);

  useInterval(() => {
    getAllProductDetailsRequests();
    getMyProducts()
      .then(({ data }) => setMyProducts(data.myProducts))
      .catch(err => console.log(err));
  }, 10000);

  const getAllProductDetailsRequests = () => {
    getProductDetailsRequest()
      .then(({ data }) =>
        setProductDetailsRequests(
          data.productDetailsRequests.filter(
            request => request.responded === false
          )
        )
      )
      .catch(err => console.log(err));
    getMyProductDetailsRequest()
      .then(({ data }) =>
        setMyProductDetailsRequests(
          data.myProductDetailsRequests.filter(
            request => request.responded === false
          )
        )
      )
      .catch(err => console.log(err));
  };

  const onApproveButtonClick = async ({
    uid,
    publicKey,
  }: ProductDetailsRequest) => {
    await postMyProductDetailsResponse(uid, publicKey);
    toast({
      title: 'Product details request approved',
      description: '',
      status: 'success',
      duration: 6000,
      isClosable: true,
    });
    getAllProductDetailsRequests();
  };

  const getNameOfProduct = (uid: string): string => {
    const myProduct = myProducts.find(product => product.uid === uid);
    return myProduct?.name;
  };

  return (
    <Page>
      <Layout>
        <Header />

        <Container maxW='container.xl'>
          <Heading color='#065384' mb={12} mt={8} textAlign='center'>
            My Product Details Requests
          </Heading>

          {myProductDetailsRequests.length === 0 ? (
            <Heading size='md' mb={12} textAlign='center'>
              No product details requests
            </Heading>
          ) : (
            <TableContainer>
              <Table variant='simple' size='md' colorScheme='cyan'>
                <Thead>
                  <Tr>
                    <Th>UID</Th>
                    <Th>Timestamp</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {myProductDetailsRequests.map(request => (
                    <Tr key={request.uid}>
                      <Td>{request.uid}</Td>
                      <Td>
                        {new Date(request.timestamp * 1000).toLocaleString()}
                      </Td>
                      <Td>
                        <Tooltip
                          hasArrow
                          label={request.publicKey}
                          bg='gray.300'
                          color='black'
                        >
                          <InfoIcon />
                        </Tooltip>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Container>

        <div style={{ height: '100px' }}></div>

        <Container maxW='container.xl'>
          <Heading color='#065384' mb={12} textAlign='center'>
            Product Details Requests
          </Heading>

          {productDetailsRequests.length === 0 ? (
            <Heading size='md' mb={12} textAlign='center'>
              No product details requests
            </Heading>
          ) : (
            <TableContainer>
              <Table variant='simple' size='md' colorScheme='cyan'>
                <Thead>
                  <Tr>
                    <Th>UID</Th>
                    <Th>Timestamp</Th>
                    <Th></Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {productDetailsRequests
                    .filter(request => request.responded === false)
                    .map(request => (
                      <Tr key={request.uid}>
                        <Td>{getNameOfProduct(request.uid)}</Td>
                        <Td>
                          {new Date(request.timestamp * 1000).toLocaleString()}
                        </Td>

                        <Td>
                          <Tooltip
                            hasArrow
                            label={request.publicKey}
                            bg='gray.300'
                            color='black'
                          >
                            <InfoIcon />
                          </Tooltip>
                        </Td>
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
                            onClick={() => onApproveButtonClick(request)}
                          >
                            Approve
                          </Button>
                        </Td>
                      </Tr>
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
