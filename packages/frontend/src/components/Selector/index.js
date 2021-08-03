import { Wrapper } from './styled';

export default function Selector({ children, onClose }) {
  return (
    <Wrapper onClick={onClose}>
      {children}
    </Wrapper>
  );
}
