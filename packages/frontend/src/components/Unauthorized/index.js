import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-transform: uppercase;
`;

const Message = styled.div`
  font-size: 1.4em;
  padding: 10px;
  background: red;
  color: white;
  font-weight: bold;
`;

export default function Unauthorized() {
  return (
    <Container>
      <Message>Unauthorized</Message>
    </Container>
  );
}
