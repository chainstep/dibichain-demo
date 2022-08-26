import { DownloadIcon } from '@chakra-ui/icons';
import { Button, Container, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useToast } from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import React, { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import Footer from '../components/commons/Footer';
import Header from '../components/commons/Header';
import Layout from '../components/commons/Layout';
import Page from '../components/commons/Page';
import { getMyDocuments } from '../services/http/documents';
import { getMyNewProducts, getMyProducts, postMyNewProducts } from '../services/http/products';
import { translateType } from '../services/translation/type-translation';
import { translateUnitToAbbreviation } from '../services/translation/unit-translation';
import { NewProduct, Product } from '../types';


const MyProductsPage: React.FC = () => {
    const [myProducts, setMyProducts] = useState([] as Product[]);
    const [myNewProducts, setMyNewProducts] = useState([] as NewProduct[]);
    const toast = useToast();

    useEffect(() => {
        getAllProducts();
    }, []);

    useInterval(() => {
        getAllProducts();
    }, 10000);

    const onButtonClick = async (uid: string): Promise<void> => {
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

    const getAllProducts = (): void => {
        getMyProducts()
            .then(({ data }) => setMyProducts(data.myProducts))
            .catch(err => console.log(err));
        getMyNewProducts()
            .then(({ data }) => setMyNewProducts(data.myNewProducts))
            .catch(err => console.log(err));
    };

    const isAlreadyBroadcasted = (uid: string): boolean => {
        const uids = myNewProducts.map(newProduct => newProduct.uid);
        return uids.includes(uid);
    };

    const getBroadcastDate = (uid: string): string => {
        const product = myNewProducts.find(newProduct => newProduct.uid === uid);
        return new Date(product['timestamp'] * 1000).toLocaleString();
    };

    const handleDownloadMyDocumentsClick = async (uids: string[]): Promise<void> => {
        const zip = new JSZip();
        const doc = zip.folder('my-documents');

        for (const uid of uids) {
            const data = await getMyDocuments(uid);
            const document = data.data.myDocuments[0];

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
                <div style={{ flex: '1 0 auto' }}>
                    <Header/>
                    <Heading p={10} textAlign='center'>
                        My Products
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
                                    zIndex={10}
                                >
                                    <Tr >
                                        <Th color='white'>UID</Th>
                                        <Th color='white'>Name</Th>
                                        <Th color='white'>Amount</Th>
                                        <Th color='white'>Number</Th>
                                        <Th color='white'>Type</Th>
                                        <Th color='white'>Weight</Th>
                                        <Th color='white'>Carbon Footprint</Th>
                                        <Th color='white'>Documents</Th>
                                        <Th color='white'></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {myProducts.map(product => (
                                        <Tr key={product.uid}>
                                            <Td>
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
                                                        onClick={() => {
                                                            handleDownloadMyDocumentsClick(product.documents);
                                                        }}
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
                                                        <Button isDisabled>
                                                            Broadcasted
                                                        </Button>
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
                </div>
                <div style={{ flexShrink: '0' }}>
                    <Footer/>
                </div>
            </Layout>
        </Page>
    );
};

export default MyProductsPage;
