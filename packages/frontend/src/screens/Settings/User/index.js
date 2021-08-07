import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchConfigByType as apiFetchConfigByType } from 'store/reducers/configSlice';

import { fromUserConfigs } from 'utils/settings';

import { Wrapper, Title } from './styled';

export default function UserSettings() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.config.config);
  const userConfigs = fromUserConfigs(user);

  const fetchConfigByType = () => dispatch(apiFetchConfigByType('user'));

  useEffect(() => {
    fetchConfigByType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Title>User Settings</Title>

      <pre>{JSON.stringify(userConfigs, null, 2)}</pre>
    </Wrapper>
  );
}
