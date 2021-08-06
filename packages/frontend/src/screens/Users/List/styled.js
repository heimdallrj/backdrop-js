import styled from 'styled-components';

import DocumentIconSource from 'assets/icons/Document/Outline';
import DeleteIconSource from 'assets/icons/Delete/Outline';
import KeyIconSource from 'assets/icons/Key/Solid';

export const Wrapper = styled.section`
  flex: 1;
  padding: 0 15px;
`;

export const Title = styled.h5`
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: bold;
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
