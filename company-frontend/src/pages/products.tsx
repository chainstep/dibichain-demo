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
import { DownloadIcon } from '@chakra-ui/icons';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Layout from '../components/commons/Layout';
import Page from '../components/commons/Page';

import Header from '../components/commons/Header';
import Footer from '../components/commons/Footer';
import {
  getMyNewProducts,
  getMyProducts,
  getProducts,
  postMyNewProducts,
} from '../services/http/products';
import { Document, Product } from '../types';
import { getDocuments, getMyDocuments } from '../services/http/documents';

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
    getMyProducts()
      .then(({ data }) => setMyProducts(data.myProducts))
      .catch(err => console.log(err));
    getMyNewProducts()
      .then(({ data }) => setMyNewProducts(data.myNewProducts))
      .catch(err => console.log(err));
    getProducts()
      .then(({ data }) => setProducts(data.products))
      .catch(err => console.log(err));
  };

  const isAlreadyBroadcasted = (uid: string) => {
    const uids = myNewProducts.map(newProduct => newProduct.uid);
    return uids.includes(uid);
  };

  const getBroadcastDate = (uid: string) => {
    const product = myNewProducts.find(newProduct => newProduct.uid === uid);
    return new Date(product['timestamp'] * 1000).toLocaleString();
  };

  const handleDownloadMyDocumentsClick = async (uids: string[]) => {
    const zip = new JSZip();
    const doc = zip.folder('my-documents');

    for (const uid of uids) {
      const data = await getMyDocuments(uid);
      const document: Document = data['data'].myDocuments[0];

      if (document) {
        doc.file(`${document.name}.${document.type}`, document.data, {
          base64: true,
        });
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });

    saveAs(content, 'my-documents.zip');
  };

  const handleDownloadDocumentsClick = async (uids: string[]) => {
    const zip = new JSZip();
    const doc = zip.folder('documents');

    for (const uid of uids) {
      const data = await getDocuments(uid);
      const document: Document = data['data'].documents[0];

      if (document) {
        doc.file(`${document.name}.${document.type}`, document.data, {
          base64: true,
        });
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });

    saveAs(content, 'documents.zip');
  };

  return (
    <Page>
      <Layout>
        <Header />

        <Container maxW='90vw'>
          <Tabs mt={8} isFitted variant='enclosed'>
            <TabList mb='1em'>
              <Tab>
                <Heading fontSize={22}>My Products</Heading>
              </Tab>
              <Tab>
                <Heading fontSize={22}>Products</Heading>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {myProducts.length === 0 ? (
                  <Heading size='md' mb={12} textAlign='center'>
                    No products
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
                          <Th>Documents</Th>
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
                              {product.carbonFootprint}{' '}
                              {product.carbonFootprintUnit}
                            </Td>
                            <Td>
                              {product.documents.length}{' '}
                              {product.documents.length > 0 && (
                                <DownloadIcon
                                  cursor='pointer'
                                  onClick={() =>
                                    handleDownloadMyDocumentsClick(
                                      product.documents
                                    )
                                  }
                                />
                              )}
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
                                <Button
                                  onClick={() => onButtonClick(product.uid)}
                                >
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
              </TabPanel>
              <TabPanel>
                {products.length === 0 ? (
                  <Heading size='md' mb={12} textAlign='center'>
                    No products
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
                          <Th>Documents</Th>
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
                              {product.carbonFootprint}{' '}
                              {product.carbonFootprintUnit}
                            </Td>

                            <Td>
                              {product.documents.length}{' '}
                              {product.documents.length > 0 && (
                                <DownloadIcon
                                  cursor='pointer'
                                  onClick={() =>
                                    handleDownloadDocumentsClick(
                                      product.documents
                                    )
                                  }
                                />
                              )}
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
