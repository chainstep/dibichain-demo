import { InfoIcon } from '@chakra-ui/icons';
import { Button, Container, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import Footer from '../components/commons/Footer';
import Header from '../components/commons/Header';
import Layout from '../components/commons/Layout';
import Page from '../components/commons/Page';
import { getProductDetailsRequest, postMyProductDetailsResponse } from '../services/http/product-details';
import { getMyProducts } from '../services/http/products';
import { Product, ProductDetailsRequest } from '../types';


const MyProductsPage: React.FC = () => {
    const [productDetailsRequests, setProductDetailsRequests] = useState([] as ProductDetailsRequest[]);
    const [myProducts, setMyProducts] = useState([] as Product[]);
    const toast = useToast();

    useEffect(() => {
        retrieveProductDetailsRequests();
        retrieveMyProducts();
    }, []);

    useInterval(() => {
        retrieveProductDetailsRequests();
        retrieveMyProducts();
    }, 10000);

    const retrieveMyProducts = (): void => {
        getMyProducts()
            .then(({ data }) => setMyProducts(data.myProducts))
            .catch(err => console.log(err));
    };

    const retrieveProductDetailsRequests = (): void => {
        getProductDetailsRequest()
            .then(({ data }) => {
                setProductDetailsRequests(
                    data.productDetailsRequests.filter(
                        request => request.responded === false
                    )
                );
            })
            .catch(err => console.log(err));
    };

    const onApproveButtonClick = async ({
        uid,
        publicKey,
    }: ProductDetailsRequest): Promise<void> => {
        await postMyProductDetailsResponse(uid, publicKey);
        toast({
            title: 'Product details request approved',
            description: '',
            status: 'success',
            duration: 6000,
            isClosable: true,
        });
        retrieveProductDetailsRequests();
    };

    const onDeclineButtonClick = async ({
        uid,
        publicKey,
    }: ProductDetailsRequest): Promise<void> => {
        await postMyProductDetailsResponse(uid, publicKey, true);
        toast({
            title: 'Product details request declined',
            description: '',
            status: 'warning',
            duration: 6000,
            isClosable: true,
        });
        retrieveProductDetailsRequests();
    };

    const getNameOfMyProduct = (uid: string): string => {
        const myProduct = myProducts.find(product => product.uid === uid);
        return myProduct?.name;
    };

    return (
        <Page>
            <Layout>
                <div style={{ flex: '1 0 auto' }}>
                    <Header />
                    <Heading p={10} textAlign='center'>
                        Products Details Requests
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
                                        <Th color='white'>Info</Th>
                                        <Th color='white'>Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {productDetailsRequests
                                        .filter(request => request.responded === false)
                                        .map(request => (
                                        <Tr key={request.uid}>
                                            <Td>
                                                <Tooltip label={request.uid}>
                                                    <Text>{request.uid.substring(0, 5)}...</Text>
                                                </Tooltip>
                                            </Td>
                                            <Td>{getNameOfMyProduct(request.uid)}</Td>
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
                                                    <InfoIcon/>
                                                </Tooltip>
                                            </Td>
                                            <Td>
                                                <Button
                                                    mr={2}
                                                    colorScheme='red'
                                                    onClick={() => onDeclineButtonClick(request)}
                                                >
                                                    Decline
                                                </Button>
                                                <Button
                                                    colorScheme='green'
                                                    onClick={() => onApproveButtonClick(request)}
                                                >
                                                    Approve
                                                </Button>
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
