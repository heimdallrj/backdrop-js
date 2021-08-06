import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  fetchAll as acFetchAllUsers,
  deleteUser as acDeleteUser,
} from 'store/reducers/userSlice';

import Table from 'components/Table';

import {
  Wrapper,
  Title,
  FlexIcons,
  KeyIcon,
  Status,
  DocIcon,
  DeleteIcon,
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

export default function UsersList({ toUpdateSingle }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [rows, setRows] = useState([]);
  const [, setUserRoles] = useState({});
  const [, setUserStatus] = useState({});

  const { users } = useSelector((state) => state.users);
  const {
    config: { user },
    isLoading,
  } = useSelector((state) => state.config);

  const fetchAllUsers = () => dispatch(acFetchAllUsers());

  const onClickEditHandler = (id) => {
    toUpdateSingle(id);
    // history.push(`/users/update/${id}`);
  };

  const onDeleteHandler = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do you want to delete?')) {
      dispatch(acDeleteUser(id));
    }
  };

  const compileRows = (users, userRoles, userStatus) => {
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
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (users && user) {
      // userRoles
      const _roles = (user && user.roles) || [];
      const _userRoles = {};
      _roles.forEach(({ role, description }) => {
        _userRoles[role] = description;
      });
      setUserRoles(_userRoles);

      // userStatus
      const _status = (user && user.status) || [];
      const _userStatus = {};
      _status.forEach(({ status, description }) => {
        _userStatus[status] = description;
      });
      setUserStatus(_userStatus);

      compileRows(users, _userRoles, _userStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, user]);

  return (
    <Wrapper>
      <Title>All Users</Title>
      {/* TODO: Add loading spinner */}
      {isLoading ? <p>loading..</p> : <Table columns={columns} rows={rows} />}
    </Wrapper>
  );
}
