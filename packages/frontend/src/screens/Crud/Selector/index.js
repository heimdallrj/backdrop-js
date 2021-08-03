import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAll as acFetchAllResources } from 'store/reducers/resourceSlice';

import SelectorSource from 'components/Selector';

import { Wrapper, List, ListItem } from './styled';

export default function Selector({ onSelect, ...restProps }) {
  const dispatch = useDispatch();

  const { resources } = useSelector(
    (state) => state.resources
  );

  const [selector, setSelector] = useState(null);

  const fetchAllResources = () => dispatch(acFetchAllResources());

  const onSelectHandler = (resource) => {
    setSelector(resource.name);
    onSelect(resource);
  }

  useEffect(() => {
    fetchAllResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SelectorSource {...restProps}>
      <Wrapper>
        <List>
          {resources.map((resource) => (
            <ListItem
              key={resource.name}
              active={selector === resource.name}
              onClick={() => onSelectHandler(resource)}
            >
              {resource.name}
            </ListItem>
          ))}
        </List>
      </Wrapper>
    </SelectorSource>
  );
}
