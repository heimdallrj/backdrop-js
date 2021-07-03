import { useEffect, useState } from 'react';
import {
  useParams
} from 'react-router-dom';

import { fetch as apiFetchResource } from 'api/resources';

export default function ResourceSingle() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState(null);

  const fetchResource = async (id) => {
    const resp = await apiFetchResource(id);
    setResource(resp);
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      fetchResource(id);
    }
  }, [id]);

  if (loading) {
    return (<p>loading...</p>);
  }

  return (
    <div>
      <pre>
        {JSON.stringify(resource, null, 2)}
      </pre>
    </div>
  );
}
