import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { fetchAll as apiFetchAll, remove as apiDelete } from 'api';

import Table from 'components/Table';

import {
  Wrapper,
  Title,
  Button,
  FlexIcons,
  KeyIcon,
  LockClosedIcon,
  DraftIcon,
  Status,
  EditIcon,
  DeleteIcon,
} from './styled';

const columns = [
  { label: 'falgs', size: 3, visible: false },
  { label: 'ID', size: 5, align: 'center' },
  { label: 'Author', size: 12 },
  { label: 'Last Updated', size: 20 },
  { label: 'Status', size: 10, align: 'center' },
  { label: 'actions', size: 5, visible: false },
];

export default function List({ resource }) {
  const history = useHistory();

  const [rows, setRows] = useState([]);

  const onClickEditHandler = ({ name }, id) => {
    history.push(`/crud/${name}/${id}`);
  };

  const onDeleteHandler = async ({ name }, id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do you want to delete?')) {
      await apiDelete(name, id);
      fetchAll({ name });
    }
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
    if (resource) {
      fetchAll(resource);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  return (
    <Wrapper>
      <Title>{resource.name}</Title>
      <Link to={`/crud/${resource.name}`}>
        <Button>Add new</Button>
      </Link>

      <Table columns={columns} rows={rows} />
    </Wrapper>
  );
}
