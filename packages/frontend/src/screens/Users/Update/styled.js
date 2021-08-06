import styled from 'styled-components';

import CloseIconSource from 'assets/icons/Close/Outline';

export const Wrapper = styled.section`
  flex: 1;
  padding: 0 15px;
`;

export const Title = styled.h5`
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: bold;
  display: flex;
`;

export const FormFooter = styled.div`
  text-align: left;
  margin: 20px 0;
`;

export const Label = styled.label`
  color: rgba(55, 65, 81, 1);
  letter-spacing: 0.025em;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1.8rem;
`;

export const FormWrap = styled.div`
  margin: 15px 0 0;
`;

export const CloseIcon = styled(CloseIconSource)`
  width: 24px;
  align-self: center;
  cursor: pointer;
  margin: 0 5px;
`;
