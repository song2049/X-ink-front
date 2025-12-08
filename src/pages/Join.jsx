import styled from 'styled-components';
import Layout from '../layouts/Layout';
import Stepper from '../components/Steps/Stepper';

const StyledJoin = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  & > .title {
    margin-top: 60px;
  }

  & > .select-border {
    display: flex;
    flex-direction: row;
    gap: 50px;
  }

  & > .select-border .companies {
    border: 1px solid #dee5e8;
    width: 476px;
    height: 412px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  & > .select-border .companies > .companies-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 354px;
    height: 253.8px;
  }

  & > .select-border .companies > .companies-box > img {
    width: 41.67px;
    height: 37.5px;
    margin-bottom: 10px;
  }

  & > .select-border .companies > .companies-box > div:nth-child(2) {
    font-size: 18.8px;
    font-weight: 700;
    margin-bottom: 13.8px;
    color: #3a4044;
  }

  & > .select-border .companies > .companies-box > div {
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 15px;
    color: #3a4044;
  }

  & > .select-border .companies > button {
    width: 200px;
    height: 57px;
    align-self: flex-start;
    margin-left: 61px;
    background-color: #03407e;
    font-size: 17px;
    font-weight: 700;
    color: #ffffff;
  }

  & > .select-border .companies > .companies-box > div:nth-child(3) {
    width: 354px;
    height: 1px;
    background-color: #dddddd;
  }

  & > .select-border .volunteer {
    border: 1px solid #dee5e8;
    width: 476px;
    height: 412px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  & > .select-border .volunteer > .volunteer-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 354px;
    height: 253.8px;
  }

  & > .select-border .volunteer > .volunteer-box > img {
    width: 41.67px;
    height: 37.5px;
    margin-bottom: 10px;
  }

  & > .select-border .volunteer > .volunteer-box > div:nth-child(2) {
    font-size: 18.8px;
    font-weight: 700;
    margin-bottom: 13.8px;
    color: #3a4044;
  }

  & > .select-border .volunteer > .volunteer-box > div {
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 15px;
    color: #3a4044;
  }

  & > .select-border .volunteer > button {
    width: 200px;
    height: 57px;
    align-self: flex-start;
    margin-left: 61px;
    background-color: #03407e;
    font-size: 17px;
    font-weight: 700;
    color: #ffffff;
  }

  & > .select-border .volunteer > .volunteer-box > div:nth-child(3) {
    width: 354px;
    height: 1px;
    background-color: #dddddd;
  }
`;

const stepsData = [
  { key: 'step1', label: '유형 선택' },
  { key: 'step2', label: '정보 입력' },
  { key: 'step3', label: '완료' },
];

const Join = () => {
  return (
    <Layout>
      <StyledJoin>
        <h1 className="title">회원가입</h1>
        <Stepper steps={stepsData} activeIndex={0} />
        <div className="select-border">
          <div className="companies">
            <div className="companies-box">
              <img src="/img/companies_img.png" />
              <div>기업 회원</div>
              <div className="line"></div>
              <div>· 채용 공고 및 인재 요건 등록</div>
              <div>· 전문 헤드헌터 매칭 및 후보자 추천</div>
              <div>· 인터뷰 일정 조율 및 진행 관리</div>
              <div>· 채용 완료 후 결과 피드백 지원</div>
            </div>
            <button>등록</button>
          </div>
          <div className="volunteer">
            <div className="volunteer-box">
              <img src="/img/volunteer_img.png" />
              <div>개인 회원</div>
              <div className="line"></div>
              <div>· 경력 및 희망 직무 정보 등록</div>
              <div>· 전문 컨설턴트 매칭 및 기업 추천</div>
              <div>· 인터뷰 일정 조율 및 결과 안내</div>
              <div>· 개인정보 보호 및 이력 관리 지원</div>
            </div>
            <button>등록</button>
          </div>
        </div>
      </StyledJoin>
    </Layout>
  );
};

export default Join;
