import styled from 'styled-components';

import DraftIconSource from 'assets/icons/DraftIcon/Solid';
import EditIconSource from 'assets/icons/Documents/Outline';
import DeleteIconSource from 'assets/icons/Delete/Outline';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;

export const Button = styled.button`
  font-size: 0.8rem;
`;

export const Selector = styled.div`
  width: 300px;
`;

export const Menu = styled.ul`
  font-size: 15px;
`;

export const ResourceItem = styled.li`
  // background-color: #f1eaea;
  margin: 2px 0;
  padding: 5px 15px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#2c3039' : '#f1eaea')};
  color: ${(props) => (props.active ? 'white' : '#000')};
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

export const DraftIcon = styled(DraftIconSource)`
  color: gray;
  width: 12px;
  align-self: center;
  cursor: pointer;
`;

export const EditIcon = styled(EditIconSource)`
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

export const FlexIcons = styled.div`
  display: flex;
  flex-direction: row;
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
