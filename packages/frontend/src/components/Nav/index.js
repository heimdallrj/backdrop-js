import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { featuresConfig } from 'config/features';

import {
  Wrapper,
  HomeIcon,
  ResourceIcon,
  DocumentsIcon,
  MediaIcon,
  UsersIcon,
  SettingsIcon,
  UserIcon,
  Menu,
  MenuItem,
} from './styled';

const mainMenuItems = [
  {
    to: '/',
    icon: <HomeIcon />,
  },
  { featureId: 'resources', to: '/resources', icon: <ResourceIcon /> },
  {
    featureId: 'crud',
    to: '/crud',
    icon: <DocumentsIcon />,
  },
  {
    featureId: 'media',
    to: '/media',
    icon: <MediaIcon />,
  },
  {
    featureId: 'users',
    to: '/users',
    icon: <UsersIcon />,
  },
];

const bottomMenuItems = [
  {
    featureId: 'settings',
    to: '/settings',
    icon: <SettingsIcon />,
  },
];

export default function Nav() {
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const [selectedPath, setSelectedPath] = useState('/');

  const getMenuItems = (config) => {
    const { role } = user;

    return config.filter(({ featureId }) => {
      if (!featureId) return true;
      return featuresConfig[featureId].includes(role);
    });
  };

  useEffect(() => {
    const { pathname } = location;
    setSelectedPath(`/${pathname.split('/')[1]}`);
  }, [location]);

  return (
    <Wrapper>
      <Menu>
        {getMenuItems(mainMenuItems).map(({ to, icon }) => (
          <MenuItem key={to} active={selectedPath === to}>
            <Link to={to}>{icon}</Link>
          </MenuItem>
        ))}
      </Menu>

      <Menu>
        <MenuItem>
          <Link to="/logout">
            <UserIcon />
          </Link>
        </MenuItem>
        {getMenuItems(bottomMenuItems).map(({ to, icon }) => (
          <MenuItem key={to} active={selectedPath === to}>
            <Link to={to}>{icon}</Link>
          </MenuItem>
        ))}
      </Menu>
    </Wrapper>
  );
}
