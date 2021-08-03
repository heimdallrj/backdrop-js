import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchAll as acFetchAllUsers } from 'store/reducers/userSlice';
import { fetchUserConfig as acFetchUserConfig } from 'store/reducers/configSlice';

import Layout from 'components/Layout';
import UsersList from './List';

import { Wrapper, Selector, Menu, MenuItem, Container } from './styled';

const SELECTORS = [
  {
    name: 'users',
    label: 'Users',
  },
];

export default function Users() {
  const dispatch = useDispatch();

  const [selector, setSelector] = useState('users');

  const fetchAllUsers = () => dispatch(acFetchAllUsers());

  const fetchUserConfig = () => dispatch(acFetchUserConfig());

  useEffect(() => {
    fetchAllUsers();
    fetchUserConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Users">
      <Wrapper>
        {/* <Selector>
          <Menu>
            {SELECTORS.map(({ name, label }) => (
              <MenuItem key={name} onClick={() => setSelector(name)} active={selector === name || false}>
                {label}
              </MenuItem>
            ))}
          </Menu>
        </Selector> */}

        <Container>{selector === 'users' && <UsersList />}</Container>
      </Wrapper>
    </Layout>
  );
}
