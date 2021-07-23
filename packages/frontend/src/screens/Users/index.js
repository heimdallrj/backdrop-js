import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { fetchAll as acFetchAllUsers } from 'store/reducers/userSlice';

import Table from 'components/Table';

import Layout from 'components/Layout';

import {
  Wrapper,
  Button,
  DocIcon,
  DeleteIcon,
  KeyIcon,
  FlexIcons,
  Status,
} from './styled';

const columns = [
  { label: 'falgs', size: 5, visible: false },
  { label: 'ID', size: 3, align: 'center' },
  { label: 'Screen Name', size: 20 },
  { label: 'User Name', size: 20 },
  { label: 'e-mail', size: 20 },
  { label: 'user role', size: 17 },
  { label: 'status', size: 10 },
  { label: 'actions', size: 5, visible: false },
];

export default function Users() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  const [rows, setRows] = useState([]);

  const fetchAllUsers = () => dispatch(acFetchAllUsers());

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const rowsFiltered = users.map(
      ({ _id, screenName, userName, email, userRole, status }, index) => {
        return {
          id: _id,
          data: [
            {
              value: <FlexIcons>{userRole === 0 && <KeyIcon />}</FlexIcons>,
              align: 'center',
            },
            { value: index + 1, align: 'center' },
            { value: screenName },
            { value: userName },
            { value: email },
            { value: userRole },
            { value: <Status>active</Status>, align: 'center' },
            {
              value: (
                <FlexIcons>
                  <DocIcon onClick={onClickUserHandler.bind(null, _id)} />
                  <DeleteIcon onClick={() => {}} />
                </FlexIcons>
              ),
            },
          ],
        };
      }
    );
    setRows(rowsFiltered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const onClickUserHandler = (id) => {
    history.push(`/users/${id}`);
  };

  return (
    <Layout title="Users">
      <Wrapper>
        <Link to={`/users/add`}>
          <Button>Create a new user</Button>
        </Link>

        <Table columns={columns} rows={rows} />
      </Wrapper>
    </Layout>
  );
}
