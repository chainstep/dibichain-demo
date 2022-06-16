import {
    Box, Flex, Img, Text, useColorModeValue
} from '@chakra-ui/react';
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
          <Img
            w='50px'
            src={`${PUBLIC_BASE_PATH}/assets/dibichain_logo.png`}
          ></Img>
        </Flex>
        <Text pt={6} fontSize={'lg'} textAlign={'center'}>
          DIBICHAIN DEMONSTRATOR
        </Text>
      </Box>
  );
};

export default Footer;