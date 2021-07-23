import styled from 'styled-components';

export const Wrapper = styled.section``;

export const Heading = styled.h5`
  text-transform: uppercase;
`;

export const Button = styled.button`
  font-size: 0.8rem;
`;

export const Library = styled.div`
  margin: 15px 0 0;
`;

export const List = styled.ul`
  margin: 15px 0 0;
  // display: flex;
  // align-content: flex-start;
  // justify-content: space-evenly;
  // flex-wrap: wrap;
  // flex-flow: row wrap;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 20px;
`;

export const ListItem = styled.li`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 75px;
  height: 75px;
  font-size: 0.6rem;
  display: inline-block;
  display: flex;
  // align-items: center;
  // justify-content: center;
  cursor: pointer;
`;

export const Image = styled.img`
  padding: 3px;
  align-items: center;
`;

export const DropZone = styled.div`
  border: 3px dashed #ccc;
  padding: 100px;
  text-align: center;
`;

export const FileList = styled.ul``;

export const UploadButton = styled.button`
  font-size: 0.8rem;
`;
