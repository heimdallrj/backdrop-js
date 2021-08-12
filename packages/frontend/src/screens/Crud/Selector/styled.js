import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 300px;
`;

export const List = styled.ul`
  font-size: 15px;
  width: 300px;
`;

export const ListItem = styled.li`
  // background-color: #f1eaea;
  margin: 2px 0;
  padding: 5px 15px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#2c3039' : '#f1eaea')};
  color: ${(props) => (props.active ? 'white' : '#000')};
`;
