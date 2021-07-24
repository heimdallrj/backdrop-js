import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;

export const Selector = styled.div`
  width: 300px;
`;

export const Menu = styled.ul`
  font-size: 15px;
`;

export const ResourceItem = styled.li`
  background-color: #f1eaea;
  margin: 2px 0;
  padding: 5px 15px;
  cursor: pointer;
`;

export const CrudWrapper = styled.div`
  flex: 1;
  padding: 0 10px;
`;

export const ResourceTitle = styled.h5`
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: bold;
`;
