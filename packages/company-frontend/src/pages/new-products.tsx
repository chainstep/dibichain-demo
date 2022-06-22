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
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import Layout from '../components/commons/Layout';
import Page from '../components/commons/Page';

import Footer from '../components/commons/Footer';
import { getNewProducts, getProducts } from '../services/http/products';
import { MyProductDetailsRequest, Product } from '../types';
import {
  getMyProductDetailsRequest,
  postMyProductDetailsRequest,
} from '../services/http/product-details';
import { translateType } from '../services/translation/type-translation';
import Header from '../components/commons/Header';

const MyProductsPage: React.FC = () => {
  const [newProducts, setNewProducts] = useState([] as Product[]);
  const [myProductDetailsRequests, setMyProductDetailsRequests] = useState(
    [] as MyProductDetailsRequest[]
  );
  const toast = useToast();

  useEffect(() => {
    getAllNewProducts();
    getMyProductDetails();
  }, []);

  useInterval(() => {
    getAllNewProducts();
    getMyProductDetails();
  }, 10000);

  const getAllNewProducts = async () => {
    const products = await getProducts();
    const uids = products['data'].products.map(product => product.uid);

    getNewProducts()
      .then(({ data }) =>
        setNewProducts(
          data.newProducts.filter(product => !uids.includes(product.uid))
        )
      )
      .catch(err => console.log(err));
  };

  const getMyProductDetails = () => {
    getMyProductDetailsRequest()
      .then(({ data }) =>
        setMyProductDetailsRequests(data.myProductDetailsRequests)
      )
      .catch(err => console.log(err));
  };

  const onButtonClick = async (uid: string) => {
    await postMyProductDetailsRequest(uid);
    toast({
      title: 'Details successfully requested',
      description: '',
      status: 'success',
      duration: 6000,
      isClosable: true,
    });
    getAllNewProducts();
    getMyProductDetails();
  };

  const productDetailsAlreadyRequested = (uid: string): boolean => {
    const notRespondedRequests = myProductDetailsRequests.filter(
      request => request.responded === false
    );

    const notRespondedRequest = notRespondedRequests.find(
      request => request.uid === uid
    );

    if (notRespondedRequest) {
      return true;
    }

    return false;
  };

  return (
    <Page>
      <Layout>
        <div style={{ flex: '1 0 auto' }}>
          <Header />

          <Heading p={10} textAlign='center'>
            New Products
          </Heading>

          <Container maxW='90vw'>
          <TableContainer
              h='45vh'
              overflowY='scroll'
              boxShadow='var(--chakra-shadows-md)'
            >
              <Table variant='simple' size='sm' colorScheme='dibichain'>
                <Thead
                  position='sticky'
                  insetBlockStart={0}
                  bg='#5DAB6A'
                  zIndex={10}
                >
                  <Tr>
                    <Th color='white'>UID</Th>
                    <Th color='white'>Name</Th>
                    <Th color='white'>Amount</Th>
                    <Th color='white'>Number</Th>
                    <Th color='white'>Type</Th>
                    <Th color='white'>Weight</Th>
                    <Th color='white'>Carbon Footprint</Th>
                    <Th color='white'></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {newProducts.map(product => (
                    <Tr key={product.uid}>
                      <Td>
                        <Tooltip label={product.uid}>
                          <Text>{product.uid.substring(0, 5)}...</Text>
                        </Tooltip>
                      </Td>
                      <Td>{product.name}</Td>
                      <Td>xxx</Td>
                      <Td>{product.number}</Td>
                      <Td>{translateType(product.type)}</Td>
                      <Td>xxx</Td>
                      <Td>xxx</Td>
                      <Td>
                        {productDetailsAlreadyRequested(product.uid) ? (
                          <Button
                            isLoading
                            loadingText='Waiting for approval'
                            onClick={() => onButtonClick(product.uid)}
                          ></Button>
                        ) : (
                          <Button onClick={() => onButtonClick(product.uid)}>
                            Request Details
                          </Button>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Container>
        </div>
        <div style={{ flexShrink: '0' }}>
          <Footer></Footer>
        </div>
      </Layout>
    </Page>
  );
};

export default MyProductsPage;
