import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Layout from 'components/Layout';
import Stats from './Stats';

import { fetchAppConfig as acFetchAppConfig } from 'store/reducers/configSlice';

import { Wrapper } from './styled';

export default function Home() {
  const dispatch = useDispatch();

  const fetchAppConfig = () => dispatch(acFetchAppConfig());

  useEffect(() => {
    fetchAppConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Wrapper>
        <Stats />
      </Wrapper>
    </Layout>
  );
}
