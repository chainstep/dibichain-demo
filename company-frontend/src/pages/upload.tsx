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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { uuid } from 'uuidv4';
import Layout from '../components/commons/Layout';
import Page from '../components/commons/Page';

import Header from '../components/commons/Header';
import Footer from '../components/commons/Footer';
import FileUploader from '../components/commons/FileUploader';

const UploadPage: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [documents, setDocuments] = useState([]);

  const sendProduct = (data) => {
    console.log(data);
  };

  const handleFile = (file, filename) => {
    const data = file.split(',')[1];
    const type = filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
    const name = filename.substring(0, filename.lastIndexOf('.')) || filename;
    const version = '1.0';
    const uid = uuid();

    console.log({ name, type, data, version, uid });

    setDocuments([{ name, type, data, version, uid }]);

  };

  return (
    <Page>
      <Layout>
        <Header />

        <Heading textAlign='center'>Upload New Product</Heading>

        <Container maxW='container.md'>
          <form onSubmit={handleSubmit(data => sendProduct(data))}>
            <SimpleGrid gap={5}>
              <FormControl>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input
                  {...register('name', { required: true })}
                  id='name'
                  placeholder='Bionic Partition'
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='type'>Type</FormLabel>
                <Select
                  {...register('type', { required: true })}
                  id='type'
                  placeholder='Select type'
                >
                  <option>assembly</option>
                  <option>purchase_part</option>
                  <option>standard_part</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='number'>Number</FormLabel>
                <Input
                  {...register('number', { required: true })}
                  id='number'
                  placeholder='EAN 20359483920'
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
                    <option>each</option>
                    <option>liter</option>
                    <option>centimeter</option>
                    <option>square_centimeter</option>
                    <option>cubic_centimeter</option>
                    <option>meter</option>
                    <option>square_meter</option>
                    <option>cubic_meter</option>
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
                    <option>mg</option>
                    <option>g</option>
                    <option>kg</option>
                    <option>%</option>
                    <option>ppm</option>
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
                    <option>mg</option>
                    <option>g</option>
                    <option>kg</option>
                  </Select>
                </FormControl>
              </SimpleGrid>

              <FileUploader handleFile={handleFile}></FileUploader>


              <Button type='submit'>Send</Button>
            </SimpleGrid>
          </form>
        </Container>

        <Footer></Footer>
      </Layout>
    </Page>
  );
};

export default UploadPage;
