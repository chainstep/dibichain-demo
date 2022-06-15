import React from 'react';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

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
      <Button rightIcon={<AddIcon height={3} />} onClick={handleClick}>Upload document</Button>
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
