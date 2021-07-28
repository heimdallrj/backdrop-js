import styled from 'styled-components';

const Wrap = styled.p`
  border: 1px solid #ccc;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
  padding: 10px;
`;

export default function Resource({ name }) {
  return <Wrap>{name}: Resource</Wrap>;
}
