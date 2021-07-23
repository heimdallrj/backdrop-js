import styled from 'styled-components';

import BackIconSource from 'assets/icons/Back/Outline';

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
`;

export const Main = styled.div`
  height: 100vh;
  flex: 14;
  padding: 15px;
  background: #fff;
  flex: 1;
`;

export const BackIcon = styled(BackIconSource)`
  width: 26px;
  margin-right: 5px;
  align-self: center;
  cursor: pointer;
`;
