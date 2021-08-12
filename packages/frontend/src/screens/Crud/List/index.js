import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import forEach from 'lodash/forEach';

import { fetchAll as apiFetchAll, remove as apiDelete } from 'api';

import Table from 'components/Table';

import { formatDate } from 'utils/datetime';

import {
  Wrapper,
  Title,
  Button,
  FlexIcons,
  KeyIcon,
  LockClosedIcon,
  Status,
  EditIcon,
  DeleteIcon,
} from './styled';

export default function List({ resource }) {
  const history = useHistory();

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
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
    setData(data);
  };

  useEffect(() => {
    if (resource) {
      fetchAll(resource);

      const _columns = [{ label: 'falgs', size: 5, visible: false }];
      const { schema } = resource;
      forEach(schema, ({ label, ...rest }) => {
        _columns.push({ label, size: 5, visible: true });
      });
      _columns.push(
        { label: 'Author', size: 25 },
        { label: 'Last Updated At', size: 35 },
        { label: 'Created At', size: 35 },
        { label: 'Status', size: 25 },
        { label: 'actions', size: 5, visible: false }
      );
      setColumns(_columns);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  useEffect(() => {
    let _rows = [];

    const mapDataToFields = (_data) => {
      const _fields = [];
      forEach(_data, (val) => {
        _fields.push({
          value: val,
        });
      });
      return _fields;
    };

    if (data && data.length > 0) {
      data.forEach(
        (
          {
            _id,
            createdAt,
            updatedAt,
            author,
            protected: isProtected,
            private: isPrivate,
            status,
            ...rest
          },
          index
        ) => {
          _rows.push({
            id: _id,
            data: [
              {
                value: (
                  <FlexIcons>
                    {isProtected && <KeyIcon />}
                    {isPrivate && <LockClosedIcon />}
                  </FlexIcons>
                ),
              },
              {
                value: index + 1,
                align: 'center',
              },
              ...mapDataToFields(rest),
              {
                value: author.name,
              },
              {
                value: formatDate(createdAt),
              },
              {
                value: formatDate(updatedAt),
              },
              {
                value: <Status>{status}</Status>,
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
          });
        }
      );
    }
    setRows(_rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
