import styled from 'styled-components';
import SelectSource from 'react-select';

export const LabelWrap = styled.div``;

export const Label = styled.label`
  color: rgba(55, 65, 81, 1);
  letter-spacing: 0.025em;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.7rem;
  line-height: 1.8rem;
`;

export const SelectWrap = styled.div``;

export const SelectExtended = styled(SelectSource)`
  font-size: 13px;
`;
