import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: ${(props) => props.maxWidth || '1260px'};
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
`;

const Container = ({ children, maxWidth }) => {
  return <StyledContainer maxWidth={maxWidth}>{children}</StyledContainer>;
};

export default Container;
