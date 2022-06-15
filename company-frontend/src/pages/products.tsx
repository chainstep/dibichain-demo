import {
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
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { DownloadIcon } from '@chakra-ui/icons';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Layout from '../components/commons/Layout';
import Page from '../components/commons/Page';

import Footer from '../components/commons/Footer';
import { getProducts } from '../services/http/products';
import { Document, Product } from '../types';
import { getDocuments } from '../services/http/documents';
import { translateUnitToAbbreviation } from '../services/translation/unit-translation';
import { translateType } from '../services/translation/type-translation';
import Header from '../components/commons/Header';

const MyProductsPage: React.FC = () => {
  const [products, setProducts] = useState([] as Product[]);

  useEffect(() => {
    retrieveProducts();
  }, []);

  useInterval(() => {
    retrieveProducts();
  }, 10000);

  const retrieveProducts = () => {
    getProducts()
      .then(({ data }) => setProducts(data.products))
      .catch(err => console.log(err));
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
        <div style={{ flex: '1 0 auto' }}>
          <Header />

          <Heading p={10} textAlign='center'>
            Products
          </Heading>

          <Container maxW='90vw'>
            <TableContainer maxH='45vh' overflowY='scroll'>
              <Table variant='simple' size='sm' colorScheme='green'>
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
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map(product => (
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
                        {translateUnitToAbbreviation(
                          product.carbonFootprintUnit
                        )}
                      </Td>

                      <Td>
                        {product.documents.length}{' '}
                        {product.documents.length > 0 && (
                          <DownloadIcon
                            cursor='pointer'
                            onClick={() =>
                              handleDownloadDocumentsClick(product.documents)
                            }
                          />
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
