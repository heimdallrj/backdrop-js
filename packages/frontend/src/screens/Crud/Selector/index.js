import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAll as acFetchAllResources } from 'store/reducers/resourceSlice';

import { Wrapper, List, ListItem } from './styled';

export default function Selector({ selected, onSelect }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { resources: resourcesOriginal } = useSelector(
    (state) => state.resources
  );

  const [resources, setResources] = useState([]);

  const fetchAllResources = () => dispatch(acFetchAllResources());

  useEffect(() => {
    fetchAllResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtered = resourcesOriginal.filter((ro) => {
      if (ro.protected) {
        if (user.role !== 0) return false;
      }
      return ro.type === 'default';
    });
    setResources(filtered);
  }, [resourcesOriginal, user]);

  const onSelectResource = (resource) => {
    onSelect(resource);
  };

  return (
    <Wrapper>
      <List>
        {resources.map((resource) => (
          <ListItem
            key={resource._id}
            active={selected && selected._id === resource._id}
            onClick={() => onSelectResource(resource)}
          >
            {resource.name}
          </ListItem>
        ))}
      </List>
    </Wrapper>
  );
}
