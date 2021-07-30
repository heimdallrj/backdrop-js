import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import {
  fetchAll as acFetchAllUsers,
  deleteUser as acDeleteUser,
} from 'store/reducers/userSlice';

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
  { label: 'status', size: 10, align: 'center' },
  { label: 'actions', size: 5, visible: false },
];

const USER_ROLES = {
  0: 'administrator',
  1: 'manager',
  2: 'editor',
  3: 'subscriber',
};

const USER_STATUS = {
  0: 'inactive',
  1: 'active',
};

export default function Users() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  const [rows, setRows] = useState([]);

  const fetchAllUsers = () => dispatch(acFetchAllUsers());

  const onClickEditHandler = (id) => {
    history.push(`/users/update/${id}`);
  };

  const onDeleteHandler = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do you want to delete?')) {
      dispatch(acDeleteUser(id));
    }
  };

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const rowsFiltered = users.map(
      ({ _id, screenName, userName, email, role, status }, index) => {
        return {
          id: _id,
          data: [
            {
              value: <FlexIcons>{role === 0 && <KeyIcon />}</FlexIcons>,
              align: 'center',
            },
            { value: index + 1, align: 'center' },
            { value: screenName },
            { value: userName },
            { value: email },
            { value: USER_ROLES[role] },
            { value: <Status>{USER_STATUS[status]}</Status>, align: 'center' },
            {
              value: (
                <FlexIcons>
                  <DocIcon onClick={onClickEditHandler.bind(null, _id)} />
                  <DeleteIcon onClick={() => onDeleteHandler(_id)} />
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

  return (
    <Layout title="Users">
      <Wrapper>
        <Link to={`/users/create`}>
          <Button>Create a new user</Button>
        </Link>

        <Table columns={columns} rows={rows} />
      </Wrapper>
    </Layout>
  );
}
