import React from 'react';
import { Flex, Spacer, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { COMPANY_NAME } from '../../constants';

const Header: React.FC = (props) => {
  return (
    <Flex w='100%' alignItems='center' padding={6}>
      <NextLink href='/products'>
        <Link ml={8} fontWeight='400' fontSize='14px'>
          Products
        </Link>
      </NextLink>
      <NextLink href='/new-products'>
        <Link ml={8} fontWeight='400' fontSize='14px'>
          New Products
        </Link>
      </NextLink>
      <NextLink href='/product-details-requests'>
        <Link ml={8} fontWeight='400' fontSize='14px'>
          Product Details Requests
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
