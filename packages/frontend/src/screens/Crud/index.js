import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { fetchAll as apiFetchAll, remove as apiDelete } from 'api';

import Layout from 'components/Layout';
import Table from 'components/Table';

import {
  Wrapper,
  Button,
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
  const history = useHistory();

  const { resources: resourcesOriginal } = useSelector(
    (state) => state.resources
  );

  const [resources, setResources] = useState([]);
  const [resource, setResource] = useState(null);
  const [rows, setRows] = useState([]);

  const onSelectResource = (name) => {
    const selected = resources.find((r) => r.name === name);
    setResource(selected);
  };

  const onClickEditHandler = ({ name }, id) => {
    history.push(`/crud/${name}/${id}`);
  };

  const fetchAll = async ({ name }) => {
    const data = await apiFetchAll(name);

    if (data && data.length > 0) {
      const _rows = data.map(({ _id, lastUpdatedAt, author }, index) => {
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
              value: author.name,
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
                  <EditIcon onClick={() => onClickEditHandler(resource, _id)} />
                  <DeleteIcon onClick={() => onDeleteHandler(resource, _id)} />
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
    const filtered = resourcesOriginal.filter((ro) => ro.type !== 'proxy');
    setResources(filtered);
  }, [resourcesOriginal]);

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

  const onDeleteHandler = async ({ name }, id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do you want to delete this resource?')) {
      await apiDelete(name, id);
      fetchAll({ name });
    }
  };

  return (
    <Layout title="CRUD">
      <Wrapper>
        <Selector>
          <Menu>
            {resources.map(({ _id, name }) => (
              <ResourceItem
                key={_id}
                active={resource && resource._id === _id}
                onClick={() => onSelectResource(name)}
              >
                {name}
              </ResourceItem>
            ))}
          </Menu>
        </Selector>
        <CrudWrapper>
          {resource && (
            <>
              <ResourceTitle>{resource.name}</ResourceTitle>
              <Link to={`/crud/${resource.name}`}>
                <Button>Add new</Button>
              </Link>
              <Table columns={columns} rows={rows} />
            </>
          )}
        </CrudWrapper>
      </Wrapper>
    </Layout>
  );
}
