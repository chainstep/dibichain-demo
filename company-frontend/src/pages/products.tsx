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
import Layout from '../components/commons/Layout';
import Page from '../components/commons/Page';

import Header from '../components/commons/Header';
import Footer from '../components/commons/Footer';
import {
  getMyNewProducts,
  getMyProducts,
  getProducts,
  postMyNewProducts,
} from '../api/products';
import { Product } from '../../types';

const MyProductsPage: React.FC = () => {
  const [myProducts, setMyProducts] = useState([] as Product[]);
  const [myNewProducts, setMyNewProducts] = useState([] as Product[]);
  const [products, setProducts] = useState([] as Product[]);
  const toast = useToast();

  useEffect(() => {
    getAllProducts();
  }, []);

  useInterval(() => {
    getAllProducts();
  }, 10000);

  const onButtonClick = async (uid: string) => {
    await postMyNewProducts(uid);
    toast({
      title: 'Successfully broadcasted',
      description: '',
      status: 'success',
      duration: 6000,
      isClosable: true,
    });
    getAllProducts();
  };

  const getAllProducts = () => {
    getMyProducts().then(({ data }) => setMyProducts(data.myProducts));
    getMyNewProducts().then(({ data }) => setMyNewProducts(data.myNewProducts));
    //getProducts().then(({ data }) => setProducts(data.products));
  };

  const isAlreadyBroadcasted = (uid: string) => {
    const uids = myNewProducts.map(newProduct => newProduct.uid);
    return uids.includes(uid);
  };

  const getBroadcastDate = (uid: string) => {
    const product = myNewProducts.find(newProduct => newProduct.uid === uid);
    return new Date(product['timestamp'] * 1000).toLocaleString();
  };

  return (
    <Page>
      <Layout>
        <Header />

        <Container maxW='container.xl'>
          <Heading mb={12} textAlign='center'>
            My Products
          </Heading>

          {myProducts.length === 0 ? (
            <Heading size='md' mb={12} textAlign='center'>
              No products
            </Heading>
          ) : (
            <TableContainer>
              <Table variant='simple' size='md'>
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
                  {myProducts.map(product => (
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
                        {isAlreadyBroadcasted(product.uid) ? (
                          <Tooltip
                            hasArrow
                            label={`on ${getBroadcastDate(product.uid)}`}
                            shouldWrapChildren
                            mt='3'
                          >
                            <Button isDisabled>Broadcasted</Button>
                          </Tooltip>
                        ) : (
                          <Button onClick={() => onButtonClick(product.uid)}>
                            Broadcast
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

        <div style={{ height: '100px' }}></div>
        <Container maxW='container.xl'>
          <Heading mb={12} textAlign='center'>
            Products
          </Heading>

          {products.length === 0 ? (
            <Heading size='md' mb={12} textAlign='center'>
              No products
            </Heading>
          ) : (
            <TableContainer>
              <Table variant='simple' size='md'>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Amount</Th>
                    <Th>Number</Th>
                    <Th>Type</Th>
                    <Th>Weight</Th>
                    <Th>Carbon Footprint</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map(product => (
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
