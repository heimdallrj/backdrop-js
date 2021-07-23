import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { fetchAll as acFetchAllUsers } from 'store/reducers/userSlice';

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

export default function Users() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { users } = useSelector(state => state.users);

  const fetchAllUsers = () => dispatch(acFetchAllUsers());

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickUserHandler = (id) => {
    history.push(`/users/${id}`);
  };

  return (
    <Layout>
      <Wrapper>
        <Heading>Users</Heading>

        <Link to={`/users/add`}>
          <Button>Create a new resource</Button>
        </Link>

        <TableWrap>
          <Table>
            <TableHead>
              <Row>
                <ColHead scope="col">ID</ColHead>
                <ColHead scope="col">First Name</ColHead>
                <ColHead scope="col" className="text-left">
                  Last Name
                </ColHead>
                <ColHead scope="col" className="text-left">
                  E-mail
                </ColHead>
                <ColHead scope="col" className="text-left">
                  Status
                </ColHead>
                <ColHead scope="col">
                  <span className="sr-only">Action</span>
                </ColHead>
              </Row>
            </TableHead>
            <TableBody>
              {users.map(({ _id, firstName, lastName, email }, index) => (
                <Row key={_id}>
                  <Col className="text-center">{index + 1}</Col>
                  <Col className="text-center">{firstName}</Col>
                  <Col>{lastName}</Col>
                  <Col>{email}</Col>
                  <Col>
                    <Status>active</Status>
                  </Col>
                  <Col>
                    <ActionWrap>
                      <DocIcon onClick={onClickUserHandler.bind(null, _id)} />{' '}
                      <DeleteIcon />
                    </ActionWrap>
                  </Col>
                </Row>
              ))}
            </TableBody>
          </Table>
        </TableWrap>
      </Wrapper>
    </Layout>
  );
}
