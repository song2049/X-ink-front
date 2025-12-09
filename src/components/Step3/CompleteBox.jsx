import Check from '../Check/Check';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledCompleteBox = styled.div`
  & {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    width: 590px;
    align-items: center;
  }

  & > h2 {
    font-size: 30px;
    font-weight: 700;
  }

  & > div {
    font-size: 16.7px;
    font-weight: 500;
  }

  & > .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    margin-top: 66px;
  }
  & > .buttons > .prev-btn {
    width: 137px;
    height: 51px;
    background-color: #e5e7f0;
    font-size: 20px;
    font-weight: 500;
    border: 0px solid;
    cursor: pointer;
    border-radius: 6px;
    color: #56575f;
  }

  & > .buttons > .next-btn {
    width: 443px;
    height: 51px;
    background-color: #03407e;
    color: #ffffff;
    font-size: 18px;
    font-weight: 900;
    border: 0px solid;
    cursor: pointer;
    border-radius: 8px;
  }
`;

const CompleteBox = () => {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    navigate(`${type}`);
  };
  return (
    <StyledCompleteBox className="complete-box">
      <Check variant={'complete'} size={'200'} />
      <h2>가입 완료!</h2>
      <div>X-ink의 회원이 되신 것을 환영합니다.</div>
      <div className="buttons">
        <button className="prev-btn" onClick={() => handleSelect('/')}>
          메인 페이지
        </button>
        <button
          className="next-btn"
          onClick={() => handleSelect('/volunteer-login')}
        >
          로그인 하기
        </button>
      </div>
    </StyledCompleteBox>
  );
};

export default CompleteBox;
