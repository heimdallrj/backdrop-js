import styled from 'styled-components';

export const Wrapper = styled.section``;

export const FormFooter = styled.div`
  text-align: left;
  margin: 10px 0;
`;

export const Button = styled.button`
  font-size: 0.8rem;
`;

export const Library = styled.div`
  margin: 15px 0 0;
`;

export const List = styled.div`
  margin: 15px 0 0;
  display: flex;
  align-content: flex-start;
  // justify-content: space-evenly;
  flex-wrap: wrap;
  flex-flow: row wrap;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 10px;
`;

export const ListItem = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 75px;
  height: 75px;
  font-size: 0.6rem;
  margin: 5px;
  cursor: pointer;

  img {
    width: 75px;
    height: 75px;
  }
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

export const FileList = styled.ul`
  list-style: none;
  margin: 15px 0;
  padding: 0;
  font-size: 13px;
  line-height: 20px;
  color: #2f2b2b;
`;

export const UploadButton = styled.button`
  font-size: 0.8rem;
`;
