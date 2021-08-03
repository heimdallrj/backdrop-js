import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Nav from 'components/Nav';

import {
  Container,
  Sidebar,
  Heading,
  HeaderWrap,
  Main,
  Left,
  UserWrap,
  BackIcon,
  UserIcon,
  Menu,
  MenuItem,
} from './styled';

export default function Layout({ title, children, showSelector, renderSidebar = null }) {
  const history = useHistory();

  const { user } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onBackClick = () => {
    history.goBack();
  };

  const onClickLogout = () => {
    setIsMenuOpen(false);
    history.push('/logout');
  };

  const User = () => {
    return (
      <>
        <UserWrap onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {user.screenName} <UserIcon />
        </UserWrap>
        {isMenuOpen && (
          <Menu>
            <MenuItem onClick={onClickLogout}>Logout</MenuItem>
          </Menu>
        )}
      </>
    );
  };

  const Header = () => {
    return (
      <HeaderWrap>
        <Left>
          {title && (
            <>
              <BackIcon onClick={onBackClick} />
              <Heading>{title}</Heading>
            </>
          )}
        </Left>
        <User />
      </HeaderWrap>
    );
  };

  return (
    <Container>
      <Sidebar>
        <Nav />
      </Sidebar>
      <Main>
        {showSelector && renderSidebar()}
        <Header />
        {children}
      </Main>
    </Container>
  );
}
