import styled from 'styled-components';

import DocumentIconSource from 'assets/icons/Document/Outline';
import DeleteIconSource from 'assets/icons/Delete/Outline';
import KeyIconSource from 'assets/icons/Key/Solid';

export const Wrapper = styled.section`
  padding: 5px 0;
`;

export const Button = styled.button`
  font-size: 0.8rem;
`;

export const DocIcon = styled(DocumentIconSource)`
  color: gray;
  width: 16px;
  align-self: center;
  cursor: pointer;
`;

export const DeleteIcon = styled(DeleteIconSource)`
  color: gray;
  width: 16px;
  align-self: center;
  cursor: pointer;
`;

export const KeyIcon = styled(KeyIconSource)`
  color: gray;
  width: 12px;
  align-self: center;
  cursor: pointer;
`;

export const FlexIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const Status = styled.span`
  font-size: 0.5rem;
  text-transform: uppercase;
  background: #e4d9d9;
  padding: 5px;
  border-radius: 20px;
  letter-spacing: 1px;
`;

export const FormWrap = styled.div`
  margin: 15px 0 0;
`;

export const FormFooter = styled.div`
  text-align: left;
  margin: 20px 0;
`;
