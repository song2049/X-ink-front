import styled from 'styled-components';

const StyledCreateUserButton = styled.button`
  width: fit-content;
  border: 1px solid #272727;
  border-radius: 16px;
  padding: 0 16px;
  gap: 10px;
  background: #ffffff;
  color: #272727;
  font-size: 13px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.5px;
  align-content: center;
  cursor: pointer;
`;

const CreateUserButton = () => {
  return <StyledCreateUserButton>회원가입</StyledCreateUserButton>;
};

export default CreateUserButton;
