import {
  Button,
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Text,
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

import Footer from '../components/commons/Footer';
import {
  getMyNewProducts,
  getMyProducts,
  postMyNewProducts,
} from '../services/http/products';
import { Document, Product } from '../types';
import { getMyDocuments } from '../services/http/documents';
import { translateUnitToAbbreviation } from '../services/translation/unit-translation';
import { translateType } from '../services/translation/type-translation';
import Header from '../components/commons/Header';

const MyProductsPage: React.FC = () => {
  const [myProducts, setMyProducts] = useState([] as Product[]);
  const [myNewProducts, setMyNewProducts] = useState([] as Product[]);
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
  return (
    <Page>
      <Layout>
        <Header />

        <Heading p={10} textAlign='center'>
          My Products
        </Heading>

        <Container maxW='90vw'>
          <TableContainer h='500px' overflowY='scroll'>
            <Table variant='simple' size='sm' colorScheme='cyan'>
              <Thead>
                <Tr>
                  <Th>UID</Th>
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
                    <Td>
                      <Tooltip label={product.uid}>
                        <Text>{product.uid.substring(0, 5)}...</Text>
                      </Tooltip>
                    </Td>
                    <Td>{product.name}</Td>
                    <Td>
                      {product.amount}{' '}
                      {translateUnitToAbbreviation(product.amountUnit)}
                    </Td>
                    <Td>{product.number}</Td>
                    <Td>{translateType(product.type)}</Td>
                    <Td>
                      {product.weight}{' '}
                      {translateUnitToAbbreviation(product.weightUnit)}
                    </Td>
                    <Td>
                      {product.carbonFootprint}{' '}
                      {translateUnitToAbbreviation(product.carbonFootprintUnit)}
                    </Td>
                    <Td>
                      {product.documents.length}{' '}
                      {product.documents.length > 0 && (
                        <DownloadIcon
                          cursor='pointer'
                          onClick={() =>
                            handleDownloadMyDocumentsClick(product.documents)
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
