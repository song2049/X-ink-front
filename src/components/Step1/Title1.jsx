import styled from 'styled-components';

const StyledTitle = styled.h1`
  & {
    margin-top: 60px;
  }
`;

const Title1 = () => {
  return <StyledTitle className="title">회원가입</StyledTitle>;
};

export default Title1;
