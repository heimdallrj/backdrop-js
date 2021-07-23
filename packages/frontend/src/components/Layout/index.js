import { useHistory } from 'react-router-dom';

import Nav from 'components/Nav';

import {
  Container,
  Sidebar,
  Heading,
  HeaderWrap,
  Main,
  BackIcon,
} from './styled';

export default function Layout({ title, children }) {
  const history = useHistory();

  const onBackClick = () => {
    history.goBack();
  };

  const Header = () => {
    if (!title) return null;
    return (
      <HeaderWrap>
        <BackIcon onClick={onBackClick} />
        <Heading>{title}</Heading>
      </HeaderWrap>
    );
  };

  return (
    <Container>
      <Sidebar>
        <Nav />
      </Sidebar>
      <Main>
        <Header />
        {children}
      </Main>
    </Container>
  );
}
