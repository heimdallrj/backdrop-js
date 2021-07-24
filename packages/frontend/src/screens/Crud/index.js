import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { fetchAll as apiFetchAllResourceData } from 'api/resource';

import Layout from 'components/Layout';
import Table from 'components/Table';

import {
  Wrapper,
  Selector,
  Menu,
  ResourceItem,
  CrudWrapper,
  ResourceTitle,
} from './styled';

export default function Crud() {
  const { resources } = useSelector((state) => state.resources);

  const [resource, setResource] = useState(null);
  const [columns] = useState([]);
  const [rows] = useState([]);

  const onSelectResource = (name) => {
    const selected = resources.find((r) => r.name === name);
    setResource(selected);
  };

  const fetchAll = async ({ name }) => {
    const resp = await apiFetchAllResourceData(name);
    console.log('++', resp);
  };

  useEffect(() => {
    if (resource) {
      fetchAll(resource);
    }
  }, [resource]);

  return (
    <Layout title="CRUD">
      <Wrapper>
        <Selector>
          <Menu>
            {resources.map(({ _id, name }) => (
              <ResourceItem key={_id} onClick={() => onSelectResource(name)}>
                {name}
              </ResourceItem>
            ))}
          </Menu>
        </Selector>
        <CrudWrapper>
          {resource && (
            <>
              <ResourceTitle>{resource.name}</ResourceTitle>

              <Table columns={columns} rows={rows} />

              <pre>{JSON.stringify(resource, null, 2)}</pre>
            </>
          )}
        </CrudWrapper>
      </Wrapper>
    </Layout>
  );
}
