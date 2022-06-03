import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

interface Props {
  children: JSX.Element;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  const toast = useToast();

  useEffect(() => {
    toast({
      title: 'TEST',
      description: '',
      status: 'success',
      duration: 6000,
      isClosable: true,
    });
  }, []);

  return children;
};

export default Wrapper;
