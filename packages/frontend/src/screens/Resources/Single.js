import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetch as apiFetchResource } from 'api/resources';

import Layout from 'components/Layout';

export default function ResourceSingle() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState(null);

  const fetchResource = async (id) => {
    const resp = await apiFetchResource(id);
    setResource(resp);
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchResource(id);
    }
  }, [id]);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <Layout>
      <pre>{JSON.stringify(resource, null, 2)}</pre>
    </Layout>
  );
}
