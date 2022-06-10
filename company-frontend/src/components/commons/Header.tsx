import React from 'react';
import { Flex, Spacer, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { COMPANY_NAME } from '../../constants';

const Header: React.FC = (props) => {
  const router = useRouter();

  return (
    <Flex fontWeight='600' w='100%' alignItems='center' padding={6}>
      <NextLink href='/products'>
        <Link color={router.pathname === '/products' ? '#065384' : ''} ml={8}>
          Products
        </Link>
      </NextLink>
      <NextLink href='/new-products'>
        <Link
          color={router.pathname === '/new-products' ? '#065384' : ''}
          ml={8}
        >
          New Products
        </Link>
      </NextLink>
      <NextLink href='/product-details-requests'>
        <Link
          color={
            router.pathname === '/product-details-requests' ? '#065384' : ''
          }
          ml={8}
        >
          Product Details Requests
        </Link>
      </NextLink>
      <NextLink href='/upload'>
        <Link
          color={
            router.pathname === '/upload' ? '#065384' : ''
          }
          ml={8}
        >
          Upload
        </Link>
      </NextLink>
      <Spacer />

      <Text mr={10} fontWeight={600} fontSize='24px'>
        {COMPANY_NAME}
      </Text>
    </Flex>
  );
};

export default Header;
