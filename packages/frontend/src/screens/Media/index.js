import { useEffect, useState } from 'react';

import { fetchAll as apiFetchAllMedia } from 'api/media';

import Layout from 'components/Layout';
import Uploader from './Uploader';

import { Wrapper, List, ListItem, Image } from './styled';

function copyToClipboard(text) {
  const elem = document.createElement('textarea');
  elem.value = text;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand('copy');
  document.body.removeChild(elem);
  alert('Copied!');
}

export default function Media() {
  const [files, setFiles] = useState([]);

  const fetchAllMedia = async () => {
    const resp = await apiFetchAllMedia();
    setFiles(resp);
  };

  const onUploadHandler = () => {
    fetchAllMedia();
  };

  useEffect(() => {
    fetchAllMedia();
  }, []);

  const MediaItem = ({ url, name, type }) => {
    return (
      <ListItem key={name} onClick={() => copyToClipboard(url)}>
        <Image src={url} alt={name} />
      </ListItem>
    );
  };

  return (
    <Layout title="Media Library">
      <Wrapper>
        <Uploader onUpload={onUploadHandler} />

        {files && files.length > 0 && <List>{files.map(MediaItem)}</List>}
      </Wrapper>
    </Layout>
  );
}
