import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { fetchAll as apiFetchAll, remove as apiDelete } from 'api';

import { fetchAll as acFetchAllResources } from 'store/reducers/resourceSlice';

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
  DeleteIcon,
  KeyIcon,
  EditIcon,
  LockClosedIcon,
  Status,
} from './styled';

const columns = [
  { label: 'falgs', size: 3, visible: false },
  { label: 'ID', size: 5, align: 'center' },
  { label: 'Author', size: 12 },
  { label: 'Last Updated', size: 20 },
  { label: 'Status', size: 10, align: 'center' },
  { label: 'actions', size: 5, visible: false },
];

export default function Crud() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { resources: resourcesOriginal } = useSelector(
    (state) => state.resources
  );

  const [resources, setResources] = useState([]);
  const [resource, setResource] = useState(null);
  const [rows, setRows] = useState([]);

  const fetchAllResources = () => dispatch(acFetchAllResources());

  const onSelectResource = (name) => {
    const selected = resources.find((r) => r.name === name);
    setResource(selected);
  };

  const onClickEditHandler = ({ name }, id) => {
    history.push(`/crud/${name}/${id}`);
  };

  const fetchAll = async ({ name }) => {
    const data = await apiFetchAll(name);

    let _rows = [];

    if (data && data.length > 0) {
      _rows = data.map(
        (
          { _id, lastUpdatedAt, author, isProtected, isPrivate, draft },
          index
        ) => {
          return {
            id: _id,
            data: [
              {
                value: (
                  <FlexIcons>
                    {isProtected && <KeyIcon />}{' '}
                    {isPrivate && <LockClosedIcon />} {draft && <DraftIcon />}
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
                    <EditIcon
                      onClick={() => onClickEditHandler(resource, _id)}
                    />
                    <DeleteIcon
                      onClick={() => onDeleteHandler(resource, _id)}
                    />
                  </FlexIcons>
                ),
              },
            ],
          };
        }
      );
    }
    setRows(_rows);
  };

  useEffect(() => {
    fetchAllResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtered = resourcesOriginal.filter((ro) => {
      if (ro.protected) {
        if (user.role !== 0) return false;
      }
      return ro.type !== 'proxy';
    });
    setResources(filtered);
  }, [resourcesOriginal, user]);

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
    if (confirm('Do you want to delete?')) {
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
