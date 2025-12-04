import styled from 'styled-components';

const StyledFooterText = styled.p`
  font-size: ${(props) => props.fontSize || '16px'};
  line-height: 28.8px;
  font-weight: ${(props) => props.fontWeight || '400'};
  color: #8d9194;
  opacity: 0.75; // 피그마 색상 옆에 보면 75% 0 ~ 1
`;

const FooterText = ({ fontSize, fontWeight, children }) => {
  return (
    <StyledFooterText fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </StyledFooterText>
  );
};

export default FooterText;
