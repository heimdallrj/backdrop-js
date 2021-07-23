import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchAll as apiFetchAllMedia } from 'api/media';

import Layout from 'components/Layout';

import { Wrapper, Heading, Button, List, ListItem, Image } from './styled';

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
    <Layout>
      <Wrapper>
        <Heading>Media Library</Heading>

        <Link to={`/media/upload`}>
          <Button>Upload new media</Button>
        </Link>

        <List>{files.map(MediaItem)}</List>
      </Wrapper>
    </Layout>
  );
}
