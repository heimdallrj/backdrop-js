import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAll as acFetchAllResources } from 'store/reducers/resourceSlice';

import Layout from 'components/Layout';

import { Wrapper, Widget } from './styled';

export default function Home() {
  const dispatch = useDispatch();

  const { resources: { resources }, media: { files } } = useSelector(state => state);

  // TODO Can remove this since we are fetchiung same in the App component
  const fetchAllResources = () => dispatch(acFetchAllResources());

  useEffect(() => {
    fetchAllResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Wrapper>
        <Widget>
          <p>Resources</p>
          <p>{resources.length}</p>
        </Widget>

        <Widget>
          <p>Media</p>
          <p>{files.length}</p>
        </Widget>
      </Wrapper >
    </Layout >
  );
}
