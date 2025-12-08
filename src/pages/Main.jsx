import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../layouts/Layout';
import Container from '../layouts/container';
import Breadcrumb from '../components/Navigation/Breadcrumb';
import SearchSection from '../sections/SearchSection/SearchSection';
import CardGrid from '../sections/CardGrid/CardGrid';
import thumbnailImage from '../assets/images/image.png';
import { useAuth } from '../contexts/AuthContext';
import { getJobs } from '../services/api';
import Pagination from '../components/Pagination/Pagination';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px;
  font-family: 'Noto Sans KR';
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 60px;
  font-family: 'Noto Sans KR';
  font-size: 18px;
  color: #D92828;
  background: #ffe8e8;
  border-radius: 12px;
  margin: 20px 0;
`;

const Main = () => {
  const { user, isAuthenticated, isCompany, loading: authLoading } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 디버깅: Main 페이지 렌더링 시 상태 확인
  console.log('📄 Main 페이지 렌더링:', {
    isAuthenticated,
    isCompany,
    user: user ? {
      name: user.name || user.companyName,
      userType: user.userType,
    } : null,
    authLoading,
  });

  // 공고 데이터 로드
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('📋 공고 목록 요청 중...');
        
        const jobsData = await getJobs();
        console.log('✅ 공고 목록 로드 성공:', jobsData);
        
        // 백엔드 응답을 프론트엔드 카드 형식으로 변환
        const formattedCards = jobsData.map((job) => ({
          id: job.id,
          image: thumbnailImage, // TODO: 나중에 기업별 이미지 추가
          dday: job.dday,
          label: job.position,
          title: job.title,
          companyId: job.companyId,
          companyName: job.companyName,
          status: job.status,
        }));
        
        setJobs(formattedCards);
      } catch (err) {
        console.error('❌ 공고 목록 로드 실패:', err);
        setError('공고 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 로딩 중
  if (loading) {
    return (
      <Layout>
        <Container maxWidth="1260px">
          <PageWrapper>
            <Breadcrumb variant="breadcrumb" items={['전체 공고 목록']} size="60px"/>
            <LoadingMessage>공고 목록을 불러오는 중입니다...</LoadingMessage>
          </PageWrapper>
        </Container>
      </Layout>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <Layout>
        <Container maxWidth="1260px">
          <PageWrapper>
            <Breadcrumb variant="breadcrumb" items={['전체 공고 목록']} size="60px"/>
            <ErrorMessage>{error}</ErrorMessage>
          </PageWrapper>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="1260px">
        <PageWrapper>
          {/* 현재 위치 네비게이션 */}
          <Breadcrumb variant="breadcrumb" items={['전체 공고 목록']} size="60px"/>

          {/* 검색 영역 */}
          <SearchSection>
            {jobs.length > 0 
              ? `총 ${jobs.length}개의 공고들을 모았어요!` 
              : '등록된 공고가 없습니다.'}
          </SearchSection>

          {/* 카드 목록 */}
          {jobs.length > 0 ? (
            <CardGrid cards={jobs} />
          ) : (
            <LoadingMessage>등록된 공고가 없습니다.</LoadingMessage>
          )}
          <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
        </PageWrapper>
      </Container>
    </Layout>
  );
};

export default Main;
