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
  Tr,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import Layout from '../components/commons/Layout';
import Page from '../components/commons/Page';

import Header from '../components/commons/Header';
import Footer from '../components/commons/Footer';
import { getNewProducts, getProducts } from '../services/http/products';
import { MyProductDetailsRequest, Product } from '../../types';
import {
  getMyProductDetailsRequest,
  postMyProductDetailsRequest,
} from '../services/http/product-details';

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
        <Header />

        <Container maxW='container.xl'>
          <Heading color='#065384' mb={12} mt={8} textAlign='center'>
            New Products
          </Heading>

          {newProducts.length === 0 ? (
            <Heading size='md' mb={12} textAlign='center'>
              No new products
            </Heading>
          ) : (
            <TableContainer>
              <Table variant='simple' size='md' colorScheme='cyan'>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Amount</Th>
                    <Th>Number</Th>
                    <Th>Type</Th>
                    <Th>Weight</Th>
                    <Th>Carbon Footprint</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {newProducts.map(product => (
                    <Tr key={product.uid}>
                      <Td>{product.name}</Td>
                      <Td>
                        {product.amount}{' '}
                        {product.amountUnit === 'each'
                          ? ''
                          : product.amountUnit}
                      </Td>
                      <Td>{product.number}</Td>
                      <Td>{product.type}</Td>
                      <Td>
                        {product.weight} {product.weightUnit}
                      </Td>
                      <Td>
                        {product.carbonFootprint} {product.weightUnit}
                      </Td>
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
          )}
        </Container>

        <Footer></Footer>
      </Layout>
    </Page>
  );
};

export default MyProductsPage;
