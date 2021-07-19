import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { fetchAll as apiFetchAllResources } from 'api/resources';

import Layout from 'components/Layout';

import {
  Wrapper,
  Heading,
  Button,
  TableWrap,
  Table,
  TableHead,
  Row,
  ColHead,
  TableBody,
  Col,
  DocIcon,
  DeleteIcon,
  ActionWrap,
  Status,
} from './styled';

export default function Resources() {
  const history = useHistory();

  const [resources, setResources] = useState([]);

  const fetchAllResources = async () => {
    const resp = await apiFetchAllResources();
    setResources(resp);
  };

  useEffect(() => {
    fetchAllResources();
  }, []);

  const onClickResourceHandler = (id) => {
    history.push(`/resources/ext/${id}`);
  };

  return (
    <Layout>
      <Wrapper>
        <Heading>Resources</Heading>

        <Link to={`/resources/create`}>
          <Button>Create a new resource</Button>
        </Link>

        <TableWrap>
          <Table>
            <TableHead>
              <Row>
                <ColHead scope="col">ID</ColHead>
                <ColHead scope="col">namespace</ColHead>
                <ColHead scope="col" className="text-left" width="200px">
                  name
                </ColHead>
                <ColHead scope="col" className="text-left">
                  type
                </ColHead>
                <ColHead scope="col" className="text-left">
                  status
                </ColHead>
                <ColHead scope="col">
                  <span class="sr-only">Action</span>
                </ColHead>
              </Row>
            </TableHead>
            <TableBody>
              {resources.map(
                ({ _id, namespace, name, type, status }, index) => (
                  <Row key={_id}>
                    <Col className="text-center">{index + 1}</Col>
                    <Col className="text-center">{namespace}</Col>
                    <Col>{name}</Col>
                    <Col>{type}</Col>
                    <Col>
                      <Status>{status}</Status>
                    </Col>
                    <Col>
                      <ActionWrap>
                        <DocIcon
                          onClick={onClickResourceHandler.bind(null, _id)}
                        />{' '}
                        <DeleteIcon />
                      </ActionWrap>
                    </Col>
                  </Row>
                )
              )}
            </TableBody>
          </Table>
        </TableWrap>
      </Wrapper>
    </Layout>
  );
}
