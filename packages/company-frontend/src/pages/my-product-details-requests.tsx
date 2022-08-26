import { InfoIcon } from '@chakra-ui/icons';
import { Container, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import Footer from '../components/commons/Footer';
import Header from '../components/commons/Header';
import Layout from '../components/commons/Layout';
import Page from '../components/commons/Page';
import { getMyProductDetailsRequest } from '../services/http/product-details';
import { getNewProducts } from '../services/http/products';
import { MyProductDetailsRequest, Product } from '../types';


const MyProductsPage: React.FC = () => {
    const [myProductDetailsRequests, setMyProductDetailsRequests] = useState([] as MyProductDetailsRequest[]);
    const [newProducts, setNewProducts] = useState([] as Product[]);

    useEffect(() => {
        retrieveMyProductDetailsRequests();
        retrieveNewProducts();
    }, []);

    useInterval(() => {
        retrieveMyProductDetailsRequests();
        retrieveNewProducts();
    }, 10000);

    const retrieveNewProducts = () => {
        getNewProducts()
            .then(({ data }) => setNewProducts(data.newProducts))
            .catch(err => console.log(err));
    };

    const retrieveMyProductDetailsRequests = (): void => {
        getMyProductDetailsRequest()
            .then(({ data }) => {
                setMyProductDetailsRequests(
                    data.myProductDetailsRequests.filter(
                        request => request.responded === false
                    )
                );
            })
            .catch(err => console.log(err));
    };

    const getNameOfNewProduct = (uid: string): string => {
        const newProduct = newProducts.find(product => product.uid === uid);
        return newProduct?.name;
    };

    return (
        <Page>
            <Layout>
                <div style={{ flex: '1 0 auto' }}>
                    <Header/>
                    <Heading p={10} textAlign='center'>
                        My Products Details Requests
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
                                    <Tr>
                                        <Th color='white'>UID</Th>
                                        <Th color='white'>Name</Th>
                                        <Th color='white'>Timestamp</Th>
                                        <Th color='white'></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {myProductDetailsRequests.map(request => (
                                        <Tr key={request.uid}>
                                            <Td p={5}>
                                                <Tooltip label={request.uid}>
                                                    <Text>
                                                        {request.uid.substring(0, 5)}...
                                                    </Text>
                                                </Tooltip>
                                            </Td>
                                            <Td>
                                                {getNameOfNewProduct(request.uid)}
                                            </Td>
                                            <Td>
                                                {new Date(request.timestamp * 1000).toLocaleString()}
                                            </Td>
                                            <Td>
                                                <Tooltip
                                                    hasArrow
                                                    label={request.publicKey}
                                                    bg='gray.300'
                                                    color='black'
                                                >
                                                    <InfoIcon />
                                                </Tooltip>
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
