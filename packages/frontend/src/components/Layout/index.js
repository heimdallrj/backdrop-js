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

export default function Layout({ isLoading, title, children }) {
  const history = useHistory();

  const { user } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onBackClick = () => {
    history.goBack();
  };

  const onClickMenuItem = (route) => {
    setIsMenuOpen(false);
    history.push(`/${route}`);
  };

  const User = () => {
    return (
      <>
        <UserWrap onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {user.screenName} <UserIcon />
        </UserWrap>
        {isMenuOpen && (
          <Menu>
            <MenuItem onClick={() => onClickMenuItem('users/me')}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => onClickMenuItem('logout')}>
              Logout
            </MenuItem>
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
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <>
            <Header />
            {children}
          </>
        )}
      </Main>
    </Container>
  );
}
