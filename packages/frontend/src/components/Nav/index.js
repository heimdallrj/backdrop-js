import { Link } from 'react-router-dom';

import {
  Wrapper,
  HomeIcon,
  ResourceIcon,
  DocumentsIcon,
  MediaIcon,
  UsersIcon,
  SettingsIcon,
  LogoutIcon,
  Menu,
  MenuItem,
} from './styled';

export default function Nav() {
  return (
    <Wrapper>
      <Menu>
        <MenuItem>
          <Link to="/">
            <HomeIcon />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/resources">
            <ResourceIcon />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/crud">
            <DocumentsIcon />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/media">
            <MediaIcon />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/users">
            <UsersIcon />
          </Link>
        </MenuItem>
      </Menu>

      <Menu>
        <MenuItem>
          <Link to="/settings">
            <SettingsIcon />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/logout">
            <LogoutIcon />
          </Link>
        </MenuItem>
      </Menu>
    </Wrapper>
  );
}
