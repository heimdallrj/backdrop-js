import { useEffect, useState } from 'react';

import { fetchAll as apiFetchAllMedia } from 'api/media';

import Layout from 'components/Layout';
import Uploader from './Uploader';

import { Wrapper, List, ListItem, Image } from './styled';

// TODO: Require to chnage from API
const MediaItem = ({ url, name, type }) => {
  return (
    <ListItem key={name}>
      <Image src={url} alt={name} />
    </ListItem>
  );
};

export default function Media() {
  const [files, setFiles] = useState([]);

  const fetchAllMedia = async () => {
    const resp = await apiFetchAllMedia();
    setFiles(resp);
  };

  useEffect(() => {
    fetchAllMedia();
  }, []);

  return (
    <Layout title="Media Library">
      <Wrapper>
        <Uploader />

        <List>{files.map(MediaItem)}</List>
      </Wrapper>
    </Layout>
  );
}
