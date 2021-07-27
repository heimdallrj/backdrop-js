import styled from 'styled-components';

import ButtonSource from 'components/Button';

export const Wrapper = styled.div`
  padding: 5px 10px 15px;
  // background: #ece7e7;
  border: 1px solid rgba(229, 231, 235, 1);
  margin: 20px 0;
`;

export const Row = styled.div`
  border: 1px solid rgba(229, 231, 235, 1);
  background: #fff;
  padding: 10px;
  margin: 6px 0;
`;

export const AddNewButton = styled.p`
  font-size: 0.8em;
  color: blue;
  cursor: pointer;
  padding: 5px 0 15px;
`;

export const Button = styled(ButtonSource)`
  background: #2c3039;
  font-size: 0.6em;
`;
