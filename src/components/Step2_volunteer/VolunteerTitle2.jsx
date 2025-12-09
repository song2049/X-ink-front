import styled from 'styled-components';

const StyledTitle = styled.h1`
  & {
    margin-top: 60px;
  }
`;

const Title2 = () => {
  return <StyledTitle className="title">개인정보</StyledTitle>;
};

export default Title2;
