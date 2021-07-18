import { Link } from 'react-router-dom';

import {
  Wrapper,
  HomeIcon,
  ResourceIcon,
  MediaIcon,
  SettingsIcon,
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
          <Link to="/media">
            <MediaIcon />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/settings">
            <SettingsIcon />
          </Link>
        </MenuItem>
      </Menu>
    </Wrapper>
  );
}
