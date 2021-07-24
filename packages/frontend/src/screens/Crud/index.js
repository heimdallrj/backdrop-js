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
  DraftIcon,
  FlexIcons,
  EditIcon,
  DeleteIcon,
  Status,
} from './styled';

const columns = [
  { label: 'falgs', size: 5, visible: false },
  { label: 'ID', size: 3, align: 'center' },
  { label: 'Author', size: 10 },
  { label: 'Last Updated', size: 20 },
  { label: 'Status', size: 10, align: 'center' },
  { label: 'actions', size: 5, visible: false },
];

export default function Crud() {
  const { resources } = useSelector((state) => state.resources);

  const [resource, setResource] = useState(null);
  const [rows, setRows] = useState([]);

  const onSelectResource = (name) => {
    const selected = resources.find((r) => r.name === name);
    setResource(selected);
  };

  const fetchAll = async ({ name }) => {
    const data = await apiFetchAllResourceData(name);

    if (data && data.length > 0) {
      const _rows = data.map(({ _id, lastUpdatedAt }, index) => {
        return {
          id: _id,
          data: [
            {
              value: (
                <FlexIcons>
                  <DraftIcon />
                </FlexIcons>
              ),
            },
            {
              value: index + 1,
              align: 'center',
            },
            {
              value: '$author',
            },
            {
              value: lastUpdatedAt,
            },
            {
              value: <Status>active</Status>,
              align: 'center',
            },
            {
              value: (
                <FlexIcons>
                  <EditIcon onClick={() => {}} />
                  <DeleteIcon onClick={() => {}} />
                </FlexIcons>
              ),
            },
          ],
        };
      });

      setRows(_rows);
    }
  };

  useEffect(() => {
    // TODO Fetch all the resources (no need now since we fetch already)
  }, []);

  useEffect(() => {
    if (resources && resources.length > 0 && !resource) {
      setResource(resources[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources]);

  useEffect(() => {
    if (resource) {
      fetchAll(resource);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            </>
          )}
        </CrudWrapper>
      </Wrapper>
    </Layout>
  );
}
