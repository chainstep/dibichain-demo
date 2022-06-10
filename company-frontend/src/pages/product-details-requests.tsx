import {
  Button,
  Container,
  Heading,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
} from '../types';
import {
  getMyProductDetailsRequest,
  getProductDetailsRequest,
  postMyProductDetailsResponse,
} from '../services/http/product-details';
import { getMyProducts, getNewProducts } from '../services/http/products';

const MyProductsPage: React.FC = () => {
  const [productDetailsRequests, setProductDetailsRequests] = useState(
    [] as ProductDetailsRequest[]
  );
  const [myProductDetailsRequests, setMyProductDetailsRequests] = useState(
    [] as MyProductDetailsRequest[]
  );
  const [myProducts, setMyProducts] = useState([] as Product[]);
  const [newProducts, setNewProducts] = useState([] as Product[]);
  const toast = useToast();

  useEffect(() => {
    getAllProductDetailsRequests();
    getMyProductsData();
    getNewProductsData();
  }, []);

  useInterval(() => {
    getAllProductDetailsRequests();
    getMyProductsData();
    getNewProductsData();
  }, 10000);

  const getMyProductsData = () => {
    getMyProducts()
      .then(({ data }) => setMyProducts(data.myProducts))
      .catch(err => console.log(err));
  };

  const getNewProductsData = () => {
    getNewProducts()
      .then(({ data }) => setNewProducts(data.newProducts))
      .catch(err => console.log(err));
  };

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

  const onDeclineButtonClick = async ({
    uid,
    publicKey,
  }: ProductDetailsRequest) => {
    await postMyProductDetailsResponse(uid, publicKey, true);
    toast({
      title: 'Product details request declined',
      description: '',
      status: 'warning',
      duration: 6000,
      isClosable: true,
    });
    getAllProductDetailsRequests();
  };

  const getNameOfMyProduct = (uid: string): string => {
    const myProduct = myProducts.find(product => product.uid === uid);
    return myProduct?.name;
  };

  const getNameOfNewProduct = (uid: string): string => {
    const newProduct = newProducts.find(product => product.uid === uid);
    return newProduct?.name;
  };

  return (
    <Page>
      <Layout>
        <Header />

        <Container maxW='90vw'>
          <Tabs mt={8} isFitted variant='enclosed'>
            <TabList mb='1em'>
              <Tab>
                <Heading fontSize={22}>My Product Details Requests</Heading>
              </Tab>
              <Tab>
                <Heading fontSize={22}>Product Details Requests</Heading>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
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
                            <Td>{getNameOfNewProduct(request.uid)}</Td>
                            <Td>
                              {new Date(
                                request.timestamp * 1000
                              ).toLocaleString()}
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
              </TabPanel>
              <TabPanel>
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
                              <Td>{getNameOfMyProduct(request.uid)}</Td>
                              <Td>
                                {new Date(
                                  request.timestamp * 1000
                                ).toLocaleString()}
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
                                  onClick={() => onDeclineButtonClick(request)}
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
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>

        <Footer></Footer>
      </Layout>
    </Page>
  );
};

export default MyProductsPage;
