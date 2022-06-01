import React from 'react';
import {
  Flex,
  Spacer,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const Header: React.FC = (props) => {
  return (
    <Flex w='100%' alignItems='center' padding={6}>
      <NextLink href='/my-products'>
        <Link ml={8} fontWeight='400' fontSize='14px'>
          My Products
        </Link>
      </NextLink>
      <NextLink href='/new-products'>
        <Link ml={8} fontWeight='400' fontSize='14px'>
        New Products
        </Link>
      </NextLink>
      <NextLink href='/product-requests'>
        <Link ml={8} fontWeight='400' fontSize='14px'>
          Product Details Requests
        </Link>
      </NextLink>
      <Spacer />
    </Flex>
  );
};

export default Header;
