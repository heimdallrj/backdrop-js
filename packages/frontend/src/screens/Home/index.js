import { useEffect, useState } from 'react';

import { fetchAll as apiFetchAllResources } from 'api/resources';

export default function Home() {
  const [resources, setResources] = useState([]);

  const fetchAllResources = async () => {
    const resp = await apiFetchAllResources();
    setResources(resp);
  }

  useEffect(() => {
    fetchAllResources();
  }, []);

  return (
    <div>
      <div>
        <p>Resources</p>
        <p>{resources.length}</p>
      </div>
    </div>
  );
}
