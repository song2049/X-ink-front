import styled from 'styled-components';

const StyledTitle = styled.h1`
  & {
    margin-top: 60px;
  }
`;

const Title3 = () => {
  return <StyledTitle className="title">가입완료</StyledTitle>;
};

export default Title3;
