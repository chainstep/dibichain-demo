import React from 'react';
import { Button } from '@chakra-ui/react';

interface Props {
  handleFile;
}

const FileUploader: React.FC<Props> = ({ handleFile }) => {
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files[0].size > 50000000) {
      return handleFile(null);
    }

    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        handleFile(reader.result, e.target.files[0].name)
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <>
      <Button
        color='#F9F7FB'
        fontFamily='Campton-medium'
        fontSize='18px'
        backgroundImage='linear-gradient(to right, #EF7383 0%, #FDA291 50%,#EF7383 100%)'
        backgroundSize='200% auto'
        transition='0.5s'
        _hover={{
          backgroundPosition: 'right center',
        }}
        _active={{ backgroundImage: 'linear-gradient(to right, #220069 0%, #220069 50%,#220069 100%)' }}
        onClick={handleClick}
      >
        Upload a file
      </Button>
      <input
        type='file'
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  );
};
export default FileUploader;
