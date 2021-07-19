import styled from 'styled-components';

import Nav from 'components/Nav';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Sidebar = styled.aside`
  background: #2c3039;
  width: 60px;
`;

const Main = styled.div`
  height: 100vh;
  flex: 14;
  padding: 15px;
  background: #fff;
  flex: 1;
`;

export default function Layout({ children }) {
  return (
    <Container>
      <Sidebar>
        <Nav />
      </Sidebar>
      <Main>{children}</Main>
    </Container>
  );
}
