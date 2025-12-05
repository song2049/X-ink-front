import styled from 'styled-components';

const StyledTitleText = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: #3a4044;
  line-height: 24px;

`;
const StyledSubtitleText = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #3a4044;
  line-height: 21.6px;
  text-align: center;
`;
const StyledDefaultText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: black;
  line-height: 14px;
  text-align: center;
`;

const renderTextByVariant = (variant, children) => {
  switch (variant) {
    case 'title':
      return <StyledTitleText>{children}</StyledTitleText>;
    case 'subtitle':
      return <StyledSubtitleText>{children}</StyledSubtitleText>;
    default:
      return <StyledDefaultText>{children}</StyledDefaultText>;
  }
};
const Text = ({ variant, children }) => {
  return renderTextByVariant(variant, children);
};

export default Text;
