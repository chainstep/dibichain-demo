import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Tag,
  TagCloseButton,
  TagLabel,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import Layout from '../components/commons/Layout';
import Page from '../components/commons/Page';

import Footer from '../components/commons/Footer';
import FileUploader from '../components/commons/FileUploader';
import { postMyProduct } from '../services/http/products';
import { Document } from '../types';
import { postMyDocuments } from '../services/http/documents';
import Header from '../components/commons/Header';

const UploadPage: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const [documents, setDocuments] = useState([] as Document[]);

  const sendProduct = async (data) => {
    await postMyDocuments(documents);

    const docUids = documents.map(doc => doc.uid);
    const product = { ...data, documents: docUids };
    await postMyProduct(product);

    router.push('/my-products');
    toast({
      title: 'Product successfully uploaded',
      description: '',
      status: 'success',
      duration: 6000,
      isClosable: true,
    });
  };

  const handleFile = (file, filename) => {
    const data = file.split(',')[1];
    const type = filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
    const name = filename.substring(0, filename.lastIndexOf('.')) || filename;
    const version = '1.0';
    const uid = uuid();
    setDocuments([
      ...documents,
      { name, type, data, version, uid, timestamp: Date.now() },
    ]);
  };

  const handleRemoveButtonClick = (uid: string) => {
    const newDocuments = documents.filter(doc => doc.uid !== uid);
    setDocuments(newDocuments);
  };

  return (
    <Page>
      <Layout>
        <div style={{ flex: '1 0 auto' }}>
          <Header />

          <Heading p={10} textAlign='center'>
            Upload New Product
          </Heading>

          <Container maxW='container.md'>
            <form onSubmit={handleSubmit(data => sendProduct(data))}>
              <SimpleGrid gap={5}>
                <FormControl>
                  <FormLabel htmlFor='name'>Name</FormLabel>
                  <Input {...register('name', { required: true })} id='name' />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='type'>Type</FormLabel>
                  <Select
                    {...register('type', { required: true })}
                    id='type'
                    placeholder='Select type'
                  >
                    <option value='assembly'>Assembly</option>
                    <option value='purchase_part'>Purchase Part</option>
                    <option value='standard_part'>Standard Part</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='number'>Number</FormLabel>
                  <Input
                    {...register('number', { required: true })}
                    id='number'
                  />
                </FormControl>

                <SimpleGrid templateColumns='2fr 1fr' gap={3}>
                  <FormControl>
                    <FormLabel htmlFor='amount'>Amount</FormLabel>
                    <NumberInput>
                      <NumberInputField
                        {...register('amount', { required: true })}
                        id='amount'
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor='amountUnit'>Unit</FormLabel>
                    <Select
                      {...register('amountUnit', { required: true })}
                      id='amountUnit'
                      placeholder='Select unit'
                    >
                      <option value='each'>each</option>
                      <option value='liter'>l</option>
                      <option value='centimeter'>cm</option>
                      <option value='square_centimeter'>cm2</option>
                      <option value='cubic_centimeter'>cm3</option>
                      <option value='meter'>m</option>
                      <option value='square_meter'>m2</option>
                      <option value='cubic_meter'>m3</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid templateColumns='2fr 1fr' gap={3}>
                  <FormControl>
                    <FormLabel htmlFor='weight'>Weight</FormLabel>
                    <NumberInput>
                      <NumberInputField
                        {...register('weight', { required: true })}
                        id='weight'
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor='weightUnit'>Unit</FormLabel>
                    <Select
                      {...register('weightUnit', { required: true })}
                      id='weightUnit'
                      placeholder='Select unit'
                    >
                      <option value='milligram'>mg</option>
                      <option value='gram'>g</option>
                      <option value='kilogram'>kg</option>
                      <option value='percentage'>%</option>
                      <option value='parts_per_million'>ppm</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid templateColumns='2fr 1fr' gap={3}>
                  <FormControl>
                    <FormLabel htmlFor='carbonFootprint'>
                      Carbon Footprint
                    </FormLabel>
                    <NumberInput>
                      <NumberInputField
                        {...register('carbonFootprint', { required: true })}
                        id='carbonFootprint'
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor='carbonFootprintUnit'>Unit</FormLabel>
                    <Select
                      {...register('carbonFootprintUnit', { required: true })}
                      id='carbonFootprintUnit'
                      placeholder='Select unit'
                    >
                      <option value='milligram'>mg</option>
                      <option value='gram'>g</option>
                      <option value='kilogram'>kg</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>

                <FileUploader handleFile={handleFile}></FileUploader>

                <VStack align='start' spacing={4}>
                  {documents.map(doc => (
                    <Tag
                      size='sm'
                      key={doc.uid}
                      borderRadius='full'
                      variant='solid'
                    >
                      <TagLabel>{doc.name}</TagLabel>
                      <TagCloseButton
                        onClick={() => handleRemoveButtonClick(doc.uid)}
                      />
                    </Tag>
                  ))}
                </VStack>

                <Button colorScheme='green' type='submit'>
                  Submit
                </Button>
              </SimpleGrid>
            </form>
          </Container>
        </div>

        <div style={{ height: '30px' }}></div>

        <div style={{ flexShrink: '0' }}>
          <Footer></Footer>
        </div>
      </Layout>
    </Page>
  );
};

export default UploadPage;
