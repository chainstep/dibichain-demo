import { Box, Flex, Grid, GridItem, Img, Link, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { PUBLIC_BASE_PATH } from '../../constants';


const Footer: React.FC = () => {
    return (
        <Box py={10}>
            <Flex
                align={'center'}
                _before={{
                    content: '""',
                    borderBottom: '1px solid',
                    borderColor: useColorModeValue('gray.200', 'gray.700'),
                    flexGrow: 1,
                    mr: 8,
                }}
                _after={{
                    content: '""',
                    borderBottom: '1px solid',
                    borderColor: useColorModeValue('gray.200', 'gray.700'),
                    flexGrow: 1,
                    ml: 8,
                }}
            >
                <Img w='50px' src={`${PUBLIC_BASE_PATH}/assets/dibichain_logo.png`}/>
            </Flex>
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                <GridItem w='100%' h='10'>
                    <Box width={20} height={20} ml={20} mt={6}>
                        <NextLink href='https://github.com/chainstep/dibichain-demo' passHref>
                            <Link>
                                <Img w='25px' src={`${PUBLIC_BASE_PATH}/assets/github.png`}/>
                            </Link>
                        </NextLink>
                    </Box>
                </GridItem>
                <GridItem w='100%' h='10'>
                    <Text pt={6} fontSize={'lg'} textAlign={'center'}>
                        Dibichain Demonstrator
                    </Text>
                </GridItem>
                <GridItem w='100%' h='10'>
                    <Box display="flex" justifyContent="flex-end" minWidth={150} pr={6}>
                        <Img w='150px' src={`${PUBLIC_BASE_PATH}/assets/BMBF.jpg`}/>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default Footer;