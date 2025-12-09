import styled from 'styled-components';
import Layout from '../layouts/Layout';
import Breadcrumb from '../components/Navigation/Breadcrumb';
import Text from '../components/Texts/Text';
import Label from '../components/Labels/Label';
import Spreater from '../components/Spreater/Spreater';
import Button from '../components/Buttons/Button';
import Logo from '../assets/images/Logo.png';



const StyledDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

`;

const Detail = () => {
    return (
      <Layout>
        <StyledDetail>
          <Breadcrumb items={['공고 목록', 'react 개발자 모집']}></Breadcrumb>
          <Text variant="header">한국기계전기전자시험연구원</Text>
          <div>
            <Label variant="primary">블록체인</Label>
            <Text variant="link">(3명 지원)</Text>
            <Text variant="title">D-17</Text>
            <Text variant="title">모집중</Text>
          </div>
          <div>
            <img src={Logo} alt="logo" />
            <div className="card-content">
              <Text variant="title">프론트 엔드 구합니다.</Text>
              <Spreater variant="thin"></Spreater>
              <div className="card-position">
                <Text variant="subtitle">포지션</Text>
                <Button
                  border={'1px solid #2C6AA9'}
                  radius={'4px'}
                  color={'#2c6aa9'}
                  backgroundColor={'#ffffff'}
                >
                  프론트엔드
                </Button>
              </div>
              <div className="card-deadline">
                <Text variant="subtitle">마감일</Text>
                <Text variant="content">2025년 1월 18일</Text>
              </div>
              <div className="card-description">
                <Text variant="subtitle">업무설명</Text>
                <Text variant="content"> · 담당하게 될 업무에 대한 설명</Text>
                <Text variant="content"> · 담당하게 될 업무에 대한 설명</Text>
              </div>
            </div>
          </div>
        </StyledDetail>
      </Layout>
    );
}

export default Detail;