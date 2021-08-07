import styled from 'styled-components';

import DocumentIconSource from 'assets/icons/Document/Outline';
import DeleteIconSource from 'assets/icons/Delete/Outline';

export const Wrapper = styled.section``;

export const Heading = styled.h5`
  text-transform: uppercase;
`;

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
  width: 100%;
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
  cursor: pointer;
`;

export const ColHead = styled.th`
  color: rgba(107, 114, 128, 1);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 0.6rem;
  width: ${(props) => `${props.width || 'auto'}`};
  text-align: ${(props) => `${props.align || 'left'}`};
`;

export const TableBody = styled.tbody`
  background-color: rgba(255, 255, 255, 1);
`;

export const Col = styled.td`
  white-space: nowrap;
  padding: 0.5rem 0.6rem;
  font-weight: normal;
  font-size: 0.9rem;
  width: ${(props) => `${props.width || 'auto'}`};
  text-align: ${(props) => `${props.align || 'left'}`};
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

export const ActionWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const Status = styled.span`
  font-size: 0.5rem;
  text-transform: uppercase;
  background: #e4d9d9;
  padding: 5px;
  border-radius: 20px;
  letter-spacing: 1px;
`;

export const NoData = styled.div`
  text-align: center;
  padding: 20px 0;
  font-size: 13px;
`;
