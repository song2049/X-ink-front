import styled from 'styled-components';
import Input from '../Inputs/Input';
import { useNavigate } from 'react-router-dom';

const StyledInputs = styled.form`
  & {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
  }

  & > .inputs-first {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
  }

  & > .inputs-second {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
  }

  & > .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }
  & > .buttons > .prev-btn {
    width: 290px;
    height: 51px;
    background-color: #e5e7f0;
    font-size: 20px;
    font-weight: 500;
    border: 0px solid;
    cursor: pointer;
    border-radius: 6px;
  }

  & .buttons > .next-btn {
    width: 290px;
    height: 51px;
    background-color: #03407e;
    color: #ffffff;
    font-size: 18px;
    font-weight: 900;
    border: 0px solid;
    cursor: pointer;
    border-radius: 6px;
  }
`;

const Inputs = () => {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    navigate(`/join/step${type}`);
  };
  return (
    <StyledInputs className="inputs">
      <div className="inputs-first">
        <Input
          variant={'label'}
          placeholder={'기업명을 입력하세요'}
          label={'기업명 *'}
          maxWidth={'200px'}
          height={'54px'}
          type={'text'}
        />
        <Input
          variant={'label'}
          placeholder={'주소를 입력하세요'}
          label={'주소 *'}
          maxWidth={'375px'}
          height={'54px'}
          type={'text'}
        />
      </div>
      <div className="inputs-second">
        <Input
          variant={'label'}
          placeholder={'등록 번호를 입력하세요'}
          label={'사업자 등록 번호 *'}
          maxWidth={'200px'}
          height={'54px'}
        />
        <Input
          variant={'label'}
          placeholder={'이메일을 입력하세요'}
          label={'이메일 *'}
          maxWidth={'375px'}
          height={'54px'}
          type={'email'}
        />
      </div>
      <div className="inputs-3">
        <Input
          variant={'label'}
          placeholder={'기업 연락처를 입력하세요'}
          label={'기업 연락처 *'}
          maxWidth={'590px'}
          height={'54px'}
        />
      </div>
      <div className="inputs-4">
        <Input
          variant={'label'}
          placeholder={'비밀번호를 입력하세요'}
          label={'비밀번호 *'}
          maxWidth={'590px'}
          height={'54px'}
          type={'password'}
        />
      </div>
      <div className="buttons">
        <button className="prev-btn" onClick={() => handleSelect('1')}>
          이전
        </button>
        <button className="next-btn" onClick={() => handleSelect('3')}>
          다음
        </button>
      </div>
    </StyledInputs>
  );
};

export default Inputs;
