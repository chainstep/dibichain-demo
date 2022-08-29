import { DownloadIcon } from '@chakra-ui/icons';
import { Container, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr } from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import React, { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import Footer from '../components/commons/Footer';
import Header from '../components/commons/Header';
import Layout from '../components/commons/Layout';
import Page from '../components/commons/Page';
import { getDocuments } from '../services/http/documents';
import { getProducts } from '../services/http/products';
import { translateType } from '../services/translation/type-translation';
import { translateUnitToAbbreviation } from '../services/translation/unit-translation';
import { Product } from '../types';


const MyProductsPage: React.FC = () => {
    const [products, setProducts] = useState([] as Product[]);

    useEffect(() => {
        retrieveProducts();
    }, []);

    useInterval(() => {
        retrieveProducts();
    }, 10000);

    const retrieveProducts = (): void => {
        getProducts()
            .then(({ data }) => setProducts(data.products))
            .catch(err => console.log(err));
    };

    const handleDownloadDocumentsClick = async (uids: string[]): Promise<void> => {
        const zip = new JSZip();
        const doc = zip.folder('documents');

        for (const uid of uids) {
            const data = await getDocuments(uid);
            const document = data.data.documents[0];

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
                        <TableContainer
                            h='50vh'
                            overflowY='scroll'
                            boxShadow='var(--chakra-shadows-md)'
                        >
                            <Table variant='simple' size='sm' colorScheme='dibichain'>
                                <Thead
                                    position='sticky'
                                    insetBlockStart={0}
                                    bg='#5DAB6A'
                                >
                                    <Tr>
                                        <Th color='white'>UID</Th>
                                        <Th color='white'>Name</Th>
                                        <Th color='white'>Amount</Th>
                                        <Th color='white'>Number</Th>
                                        <Th color='white'>Type</Th>
                                        <Th color='white'>Weight</Th>
                                        <Th color='white'>Carbon Footprint</Th>
                                        <Th color='white'>Documents</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {products.map(product => (
                                        <Tr key={product.uid}>
                                            <Td p={5}>
                                                <Tooltip label={product.uid}>
                                                    <Text>
                                                        {product.uid.substring(0, 5)}...
                                                    </Text>
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
                    <Footer/>
                </div>
            </Layout>
        </Page>
    );
};

export default MyProductsPage;
