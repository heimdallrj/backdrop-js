import styled from 'styled-components';

import AppIconSource from 'assets/icons/App/Solid';
import HomeIconSource from 'assets/icons/Home/Solid';
import ResourceIconSource from 'assets/icons/Resource/Solid';
import MediaIconSource from 'assets/icons/Media/Solid';
import SettingsIconSource from 'assets/icons/Settings/Solid';
import UsersIconSource from 'assets/icons/Users/Solid';
import DocumentsIconSource from 'assets/icons/Documents/Solid';
import LogoutIconSource from 'assets/icons/Logout/Outline';

export const Wrapper = styled.div`
  flex: 1;
  background: #2c3039;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

export const AppIcon = styled(AppIconSource)`
  color: red;
  width: 24px;
  align-self: center;
`;

export const HomeIcon = styled(HomeIconSource)`
  color: red;
  width: 24px;
  align-self: center;
`;

export const ResourceIcon = styled(ResourceIconSource)`
  color: red;
  width: 24px;
  align-self: center;
`;

export const DocumentsIcon = styled(DocumentsIconSource)`
  color: red;
  width: 24px;
  align-self: center;
`;

export const MediaIcon = styled(MediaIconSource)`
  color: red;
  width: 24px;
  align-self: center;
`;

export const SettingsIcon = styled(SettingsIconSource)`
  color: red;
  width: 24px;
  align-self: center;
`;

export const UsersIcon = styled(UsersIconSource)`
  color: red;
  width: 24px;
  align-self: center;
`;

export const LogoutIcon = styled(LogoutIconSource)`
  color: red;
  width: 24px;
  align-self: center;
`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0;
`;

export const MenuItem = styled.li`
  cursor: pointer;
  padding: 7px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${(props) => (props.active ? '#ffffff' : '#2c3039')};
`;
