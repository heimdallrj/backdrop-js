import styled from 'styled-components';

export const List = styled.ul`
  width: 300px;
  font-size: 15px;
`;

export const ListItem = styled.li`
  margin: 2px 0;
  padding: 5px 15px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#2c3039' : '#f1eaea')};
  color: ${(props) => (props.active ? 'white' : '#000')};

  &:hover {
    background-color: #2c3039;
    color: white;
  }
`;
