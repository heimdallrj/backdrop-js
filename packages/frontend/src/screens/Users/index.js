import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import {
  fetchAll as acFetchAllUsers,
  deleteUser as acDeleteUser,
} from 'store/reducers/userSlice';
import { fetchConfigByType as apiFetchConfigByType } from 'store/reducers/configSlice';

import Layout from 'components/Layout';
import Table from 'components/Table';

import { fromUserConfigs } from 'utils/settings';

import {
  Wrapper,
  Button,
  FlexIcons,
  KeyIcon,
  DocIcon,
  DeleteIcon,
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

export default function Users() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.config.config);

  const { userRoles, userStatus } = fromUserConfigs(user);

  const [rows, setRows] = useState([]);

  const fetchConfigByType = () => dispatch(apiFetchConfigByType('user'));
  const fetchAllUsers = () => dispatch(acFetchAllUsers());

  const onClickEditHandler = (id) => {
    history.push(`users/update/${id}`);
  };

  const onDeleteHandler = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do you want to delete?')) {
      dispatch(acDeleteUser(id));
    }
  };

  const compileRows = (users) => {
    if (users && userRoles && userStatus) {
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
              { value: userRoles[role] },
              {
                value: <Status>{userStatus[status]}</Status>,
                align: 'center',
              },
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
    }
  };

  useEffect(() => {
    fetchConfigByType();
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    compileRows(users);
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
