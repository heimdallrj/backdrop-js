import SlidingPanel from 'react-sliding-side-panel';

import { Wrapper } from './styled';

export default function SidePane({
  size = 40,
  isOpen = true,
  direction = 'right',
  noBackdrop = false,
  onClose = () => {},
  children,
  ...restProps
}) {
  return (
    <SlidingPanel
      {...restProps}
      type={direction}
      isOpen={isOpen}
      size={size}
      noBackdrop={noBackdrop}
    >
      <Wrapper>{children}</Wrapper>
    </SlidingPanel>
  );
}
