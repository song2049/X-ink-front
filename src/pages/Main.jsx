import styled from 'styled-components';
import Dropdown from '../components/Dropdown/Dropdown';
import Button from '../components/Buttons/Button';
import Text from '../components/Texts/Text';
import Layout from '../layouts/Layout';
import Container from '../layouts/container';
import Input from '../components/Inputs/Input';

const StyledMainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
`;

const Main = () => {
  const handleButton3Click = () => {
    console.log('버튼 3 클릭');
  };

  const handleDropdownChange = (value) => {
    console.log('Dropdown 변경:', value);
  };

  return (
    <Layout>
      <Container maxWidth="1260px">
        <StyledMainWrap>
          <Text variant="subtitle">전체 공고 목록</Text>
          <div>
            <Dropdown
              label="버튼 1"
              options={['전체', '블록체인', '프론트', '백엔드']}
              onChange={handleDropdownChange}
            />
            <Text variant="title">관련 공고들을 모았어요!</Text>
          </div>
          <div>
            <Input variant="search" placeholder="검색어를 입력해주세요." />
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {/* ButtonPlay의 3번 버튼 설정 */}
              <Button
                label="바로 가기"
                variant="blue"
                size="sm"
                onClick={handleButton3Click}
              />
            </div>
          </div>
          <Text variant="title">Title</Text>
          <Text variant="subtitle">Subtitle</Text>
          <Text variant="default">Default</Text>
        </StyledMainWrap>
      </Container>
    </Layout>
  );
};

export default Main;
