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
import { getNewProducts } from '../api/products';
import { Product } from '../../types';
import { postMyProductDetailsRequest } from '../api/product-details';

const MyProductsPage: React.FC = () => {
  const [newProducts, setNewProducts] = useState([] as Product[]);
  const toast = useToast();

  useEffect(() => {
    getAllNewProducts();
  }, []);

  useInterval(() => {
    getAllNewProducts();
  }, 10000);

  const getAllNewProducts = () => {
    getNewProducts().then(({ data }) => setNewProducts(data.newProducts));
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
  };

  return (
    <Page>
      <Layout>
        <Header />

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
