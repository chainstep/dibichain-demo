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
import { getMyNewProducts, getMyProducts } from '../api/products';
import { Product } from '../../types';

const MyProductsPage: React.FC = () => {
  const [myProducts, setMyProducts] = useState([] as Product[]);
  const [myNewProducts, setMyNewProducts] = useState([] as Product[]);

  useEffect(() => {
    getMyProducts().then(({ data }) => setMyProducts(data.myProducts));
    //getMyNewProducts().then(({ data }) => setMyNewProducts(data.myProducts));
  }, []);

  useInterval(() => {
    getMyProducts().then(({ data }) => setMyProducts(data.myProducts));
    //getMyNewProducts().then(({ data }) => setMyNewProducts(data.myProducts));
  }, 10000);

  const onButtonClick = (uid: string) => {
    console.log(uid);
  };

  const isAlreadyBroadcasted = (uid: string) => {
    const uids = myNewProducts.map(newProduct => newProduct.uid);
    return uids.includes(uid);
  };

  return (
    <Page>
      <Layout>
        <Header />

        <Container maxW='container.xl'>
          <Heading mb={12} textAlign='center'>
            My Products
          </Heading>

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
                {myProducts.map(product => (
                  <Tr key={product.uid}>
                    <Td>{product.name}</Td>
                    <Td>
                      {product.amount}{' '}
                      {product.amountUnit === 'each' ? '' : product.amountUnit}
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
                      {!isAlreadyBroadcasted(product.uid) && (
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
        </Container>

        <Footer></Footer>
      </Layout>
    </Page>
  );
};

export default MyProductsPage;
