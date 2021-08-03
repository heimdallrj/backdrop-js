import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAll as acFetchAllResources } from 'store/reducers/resourceSlice';
import { fetchAll as acFetchAllMedia } from 'store/reducers/mediaSlice';

import { Wrapper, Widget } from './styled';

export default function Stats() {
  const dispatch = useDispatch();

  const fetchAllResources = () => dispatch(acFetchAllResources());

  const fetchAllMedia = () => dispatch(acFetchAllMedia());

  useEffect(() => {
    fetchAllResources();
    fetchAllMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    resources: { resources },
    media: { files },
  } = useSelector((state) => state);

  return (
    <Wrapper>
      <Widget>
        <p>Resources</p>
        <p>{resources.length}</p>
      </Widget>

      <Widget>
        <p>Media</p>
        <p>{files.length}</p>
      </Widget>
    </Wrapper>
  );
}
