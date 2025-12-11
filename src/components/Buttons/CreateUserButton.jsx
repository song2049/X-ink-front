import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CreateUserButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // TODO: 회원가입 페이지 구현 후 경로 수정
    navigate('/join/step1');
  };

  return <StyledCreateUserButton onClick={handleClick}>회원가입</StyledCreateUserButton>;
};

export default CreateUserButton;
