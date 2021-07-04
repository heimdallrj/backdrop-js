import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { fetchAll as apiFetchAllResources } from 'api/resources';

const Wrapper = styled.div`
  display: flex;
`;

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
    <Wrapper>
      <div style={{ border: '1px solid #ccc', textAlign: 'center', padding: '5px' }}>
        <p>{resources.length}</p>
        <p>Resources</p>
      </div>
    </Wrapper>
  );
}
