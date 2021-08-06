import styled from 'styled-components';

import BackIconSource from 'assets/icons/Back/Outline';
import UserIconSource from 'assets/icons/User/Circle/Solid';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const Sidebar = styled.aside`
  background: #2c3039;
  width: 60px;
`;

export const Heading = styled.h5`
  text-transform: uppercase;
`;

export const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Main = styled.div`
  height: 100vh;
  flex: 14;
  padding: 10px;
  background: #fff;
  flex: 1;
  overflow-y: scroll;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const UserWrap = styled.div`
  align-self: right;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  cursor: pointer;
`;

export const BackIcon = styled(BackIconSource)`
  width: 26px;
  margin-right: 5px;
  align-self: center;
  cursor: pointer;
`;

export const UserIcon = styled(UserIconSource)`
  color: gray;
  width: 28px;
  align-self: center;
  margin-left: 5px;
`;

export const Menu = styled.ul`
  position: absolute;
  right: 18px;
  top: 45px;
  padding: 5px 35px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: #eae1e1;
  box-shadow: rgb(67 71 85 / 27%) 0px 0px 0.25em,
    rgb(90 125 188 / 5%) 0px 0.25em 1em;
`;

export const MenuItem = styled.li`
  cursor: pointer;
`;
