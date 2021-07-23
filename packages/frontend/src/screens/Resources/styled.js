import styled from 'styled-components';

import DocumentIconSource from 'assets/icons/Document/Outline';
import DeleteIconSource from 'assets/icons/Delete/Outline';
import AddDocumentIconSource from 'assets/icons/AddDocument/Outline';
import KeyIconSource from 'assets/icons/Key/Solid';
import LockClosedIconSource from 'assets/icons/Lock/Closed/Solid';

export const Wrapper = styled.section``;

export const Button = styled.button`
  font-size: 0.8rem;
`;

export const TableWrap = styled.section`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  overflow: hidden;
  border-bottom-width: 1px;
  width: 100%;
  margin: 15px 0 0;
`;

export const Table = styled.table`
  min-width: 100%;
  border-collapse: collapse;
  text-indent: 0;
  border-color: inherit;
`;

export const TableHead = styled.thead`
  border-bottom: 1px solid #e2d8d8;
  background-color: rgba(249, 250, 251, 1);
`;

export const Row = styled.tr`
  border-bottom: 1px solid #e2d8d8;
`;

export const ColHead = styled.th`
  color: rgba(107, 114, 128, 1);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem;
  width: ${(props) => `${props.width || 0}`};
`;

export const TableBody = styled.tbody`
  background-color: rgba(255, 255, 255, 1);
`;

export const Col = styled.td`
  white-space: nowrap;
  padding: 0.5rem;
  font-weight: normal;
  font-size: 0.9rem;
`;

export const DocIcon = styled(DocumentIconSource)`
  color: gray;
  width: 16px;
  align-self: center;
  cursor: pointer;
`;

export const AddDocumentIcon = styled(AddDocumentIconSource)`
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

export const LockClosedIcon = styled(LockClosedIconSource)`
  color: gray;
  width: 12px;
  align-self: center;
  cursor: pointer;
`;

export const KeyIcon = styled(KeyIconSource)`
  color: gray;
  width: 12px;
  align-self: center;
  cursor: pointer;
`;

export const Status = styled.span`
  font-size: 0.5rem;
  text-transform: uppercase;
  background: #e4d9d9;
  padding: 5px;
  border-radius: 20px;
  letter-spacing: 1px;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FlexIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const NameWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Method = styled.span`
  text-transform: uppercase;
  font-size: 0.5rem;
  background: #e4d9d9;
  // border-radius: 20px;
  padding: 5px;
  letter-spacing: 1px;
  margin: 0 3px;
`;
