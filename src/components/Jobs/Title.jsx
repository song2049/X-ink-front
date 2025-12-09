import styled from 'styled-components';

const StyledTitle = styled.h1`
  & {
    margin-top: 60px;
  }
`;

const Title = () => {
  return <StyledTitle className="title">공고 관리</StyledTitle>;
};

export default Title;
