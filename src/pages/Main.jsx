import styled from 'styled-components';
import Text from '../components/Texts/Text';
import Layout from '../layouts/Layout';
import Container from '../layouts/container';
import SearchSection from '../sections/SearchSection/SearchSection';
import CardGrid from '../sections/CardGrid/CardGrid';
import thumbnailImage from '../assets/images/image.png';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100%;
`;

const PageTitle = styled.div`
  margin-bottom: 20px;
`;

const Main = () => {
  // 검색 핸들러
  const handleSearch = () => {
    console.log('검색 실행');
  };

  // 필터 변경 핸들러
  const handleFilterChange = (value) => {
    console.log('필터 변경:', value);
  };

  // 카드 데이터 (실제로는 API에서 받아올 데이터)
  const cardData = [
    {
      image: thumbnailImage,
      dday: 'D-7',
      label: '프론트엔드',
      title: 'React 개발자 모집',
      description: '프론트엔드 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-5',
      label: '백엔드',
      title: 'Node.js 개발자 모집',
      description: '백엔드 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-10',
      label: '블록체인',
      title: 'Solidity 개발자 모집',
      description: '블록체인 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-3',
      label: '프론트엔드',
      title: 'Vue.js 개발자 모집',
      description: '프론트엔드 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-12',
      label: '백엔드',
      title: 'Java 개발자 모집',
      description: '백엔드 개발자를 찾습니다',
    },
    {
      image: thumbnailImage,
      dday: 'D-8',
      label: '프론트엔드',
      title: 'Next.js 개발자 모집',
      description: '프론트엔드 개발자를 찾습니다',
    },
  ];

  return (
    <Layout>
      <Container maxWidth="1260px">
        <PageWrapper>
          <PageTitle>
            <Text variant="subtitle">전체 공고 목록</Text>
          </PageTitle>

          <SearchSection
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filterOptions={['전체', '블록체인', '프론트', '백엔드']}
          />

          <CardGrid cards={cardData} variant="default" />
        </PageWrapper>
      </Container>
    </Layout>
  );
};

export default Main;
