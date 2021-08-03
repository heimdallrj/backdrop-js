import styled from 'styled-components';

export const Wrapper = styled.section`
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

export const MenuItem = styled.li`
  // background-color: #f1eaea;
  margin: 2px 0;
  padding: 5px 15px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#2c3039' : '#f1eaea')};
  color: ${(props) => (props.active ? 'white' : '#000')};
`;

export const Container = styled.div`
  flex: 1;
  padding: 0 10px;
`;

export const FormWrap = styled.div`
  margin: 15px 0 0;
`;

export const FormFooter = styled.div`
  text-align: left;
  margin: 20px 0;
`;
