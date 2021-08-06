import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchUserConfig as apiFetchUserConfig } from 'store/reducers/configSlice';

import Layout from 'components/Layout';

import Selector from './Selector';
import UsersList from './List';
import CreateUser from './Create';
import UpdateSingleUser from './Update';

import { Wrapper } from './styled';

const options = [
  {
    name: 'allUsers',
    label: 'All Users',
  },
  {
    name: 'newUser',
    label: 'Create a new user',
  },
];

export default function Users() {
  const dispatch = useDispatch();

  const [selector, setSelector] = useState('allUsers');
  const [editSingleUser, setEditSingleUser] = useState(null);

  const fetchUserConfig = () => dispatch(apiFetchUserConfig());

  const onSelectHandler = (nextSelector) => {
    setSelector(nextSelector);
    setEditSingleUser(null);
  };

  useEffect(() => {
    fetchUserConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Users">
      <Wrapper>
        <Selector
          options={options}
          selected={selector}
          onSelect={onSelectHandler}
        />
        {selector === 'allUsers' && !editSingleUser && (
          <UsersList toUpdateSingle={setEditSingleUser} />
        )}
        {selector === 'newUser' && (
          <CreateUser done={() => setSelector('allUsers')} />
        )}
        {selector === 'allUsers' && editSingleUser && (
          <UpdateSingleUser
            id={editSingleUser}
            done={() => setEditSingleUser(null)}
          />
        )}
      </Wrapper>
    </Layout>
  );
}
