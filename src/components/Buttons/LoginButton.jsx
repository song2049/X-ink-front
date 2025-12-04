import styled from 'styled-components';

const StyledLoginButton = styled.button`
  background: #272727;
  border: 1px solid #272727;
  color: white;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 700;
  align-content: center;
  border-radius: 16px;
  line-height: 28px;
  letter-spacing: -0.5px;
  cursor: pointer;
`;

const LoginButton = () => {
  return <StyledLoginButton>로그인</StyledLoginButton>;
};

export default LoginButton;
