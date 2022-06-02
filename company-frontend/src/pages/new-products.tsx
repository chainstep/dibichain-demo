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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import Layout from '../components/commons/Layout';
import Page from '../components/commons/Page';

import Header from '../components/commons/Header';
import Footer from '../components/commons/Footer';
import { getMyNewProducts, getNewProducts } from '../api/products';
import { Product } from '../../types';
import { postMyProductDetailsRequest } from '../api/product-details';

const MyProductsPage: React.FC = () => {
  const [newProducts, setNewProducts] = useState([] as Product[]);
  const [myNewProducts, setMyNewProducts] = useState([] as Product[]);

  useEffect(() => {
    getNewProducts().then(({ data }) => setNewProducts(data.newProducts));
    //getMyNewProducts().then(({ data }) => setMyNewProducts(data.newProducts));
  }, []);

  useInterval(() => {
    getNewProducts().then(({ data }) => setNewProducts(data.newProducts));
    //getMyNewProducts().then(({ data }) => setMyNewProducts(data.newProducts));
  }, 10000);

  const onButtonClick = (uid: string) => {
    postMyProductDetailsRequest(uid).then(res => console.log(res));
  };

  return (
    <Page>
      <Layout>
        <Header />

        <Container maxW='container.xl'>
          <Heading mb={12} textAlign='center'>
            My New Products
          </Heading>

          {myNewProducts.length === 0 ? (
            <Heading size='md' mb={12} textAlign='center'>
              No new products
            </Heading>
          ) : (
            <TableContainer>
              <Table variant='simple'>
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
                  {myNewProducts.map(product => (
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

        <div style={{ height: '100px' }}></div>

        <Container maxW='container.xl'>
          <Heading mb={12} textAlign='center'>
            New Products
          </Heading>

          {newProducts.length === 0 ? (
            <Heading size='md' mb={12} textAlign='center'>
              No new products
            </Heading>
          ) : (
            <TableContainer>
              <Table variant='simple'>
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
                        <Button onClick={() => onButtonClick(product.uid)}>
                          Request Details
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
