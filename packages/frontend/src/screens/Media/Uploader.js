import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { create as apiCreateMedia } from 'api/media';

import Button from 'components/Button';

import { Wrapper, Library, DropZone, FileList, FormFooter } from './styled';

export default function Uploader({ onUpload }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, image/gif',
    maxFiles: 5,
  });

  const [files, setFiles] = useState([]);
  const [, setError] = useState(null);
  const [uploding, setUploading] = useState(false);

  const createMedia = async () => {
    setUploading(true);
    apiCreateMedia(acceptedFiles, (err, resp) => {
      if (err) {
        setError(err);
      }
      setUploading(false);
      setFiles([]);

      if (resp) onUpload(resp);
    });
  };

  const handleUpload = () => {
    createMedia(files);
  };

  useEffect(() => {
    const _files = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
    setFiles(_files);
  }, [acceptedFiles]);

  return (
    <Wrapper>
      <Library>
        <DropZone {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(Only *.jpeg, *.png and *.gif images will be accepted)</em>
        </DropZone>

        {files && files.length > 0 && (
          <FileList>
            <ul>{files}</ul>
          </FileList>
        )}

        {files && files.length > 0 && (
          <FormFooter>
            <Button type="button" onClick={handleUpload}>
              {uploding ? <span>Uploading..</span> : <span>Upload</span>}
            </Button>
          </FormFooter>
        )}
      </Library>
    </Wrapper>
  );
}
