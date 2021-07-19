import { useEffect, useState } from 'react';

import { fetchAll as apiFetchAllResources } from 'api/resources';

import Layout from 'components/Layout';

import { Wrapper, Widget } from './styled';

export default function Home() {
  const [resources, setResources] = useState([]);

  const fetchAllResources = async () => {
    const resp = await apiFetchAllResources();
    setResources(resp);
  };

  useEffect(() => {
    fetchAllResources();
  }, []);

  return (
    <Layout>
      <Wrapper>
        <Widget>
          <p>Resources</p>
          <p>{resources.length}</p>
        </Widget>
      </Wrapper>
    </Layout>
  );
}
