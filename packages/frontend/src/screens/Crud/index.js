import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Layout from 'components/Layout';

import Selector from './Selector';
import List from './List';

import { Wrapper } from './styled';

export default function Crud() {
  const { resources } = useSelector((state) => state.resources);

  const [resource, setResource] = useState(null);

  useEffect(() => {
    if (resources && resources.length > 0 && !resource) {
      setResource(resources[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources]);

  const onSelectHandler = (resource) => {
    setResource(resource);
  };

  return (
    <Layout title="CRUD">
      <Wrapper>
        <Selector onSelect={onSelectHandler} selected={resource} />
        {resource && <List resource={resource} />}
      </Wrapper>
    </Layout>
  );
}
