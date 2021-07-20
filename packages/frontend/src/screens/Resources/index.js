import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { fetchAll as apiFetchAllResources } from 'api/resources';

import Table from 'components/Table';

import Layout from 'components/Layout';

import {
  Wrapper,
  Heading,
  Button,
  DocIcon,
  DeleteIcon,
  ActionWrap,
  Status,
} from './styled';

const columns = [
  { label: 'ID', align: 'center' },
  { label: 'namespace', align: 'center' },
  { label: 'name', width: '200px' },
  { label: 'type' },
  { label: 'status', align: 'center' },
  { label: 'actions', visibility: 'hidden' },
];

export default function Resources() {
  const history = useHistory();

  const [rows, setRows] = useState([]);
  const [resources, setResources] = useState([]);

  const fetchAllResources = async () => {
    const resp = await apiFetchAllResources();
    setResources(resp);
  };

  const onClickResourceHandler = (id) => {
    history.push(`/resources/ext/${id}`);
  };

  useEffect(() => {
    fetchAllResources();
  }, []);

  useEffect(() => {
    const rowsFiltered = resources.map(
      ({ _id, namespace, name, type, status }, index) => {
        return [
          { value: index + 1, align: 'center' },
          { value: namespace, align: 'center' },
          { value: name },
          { value: type },
          { value: <Status>{status}</Status>, align: 'center' },
          {
            value: (
              <ActionWrap>
                <DocIcon onClick={onClickResourceHandler.bind(null, _id)} />
                <DeleteIcon onClick={() => {}} />
              </ActionWrap>
            ),
          },
        ];
      }
    );
    setRows(rowsFiltered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources]);

  return (
    <Layout>
      <Wrapper>
        <Heading>Resources</Heading>

        <Link to={`/resources/create`}>
          <Button>Create a new resource</Button>
        </Link>

        <Table columns={columns} rows={rows} />
      </Wrapper>
    </Layout>
  );
}
