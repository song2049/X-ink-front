import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginButton from '../components/Buttons/LoginButton';
import CreateUserButton from '../components/Buttons/CreateUserButton';
import { ProfileWithInfo, ProfileMenu } from '../components/Profile';
import Logo from '../assets/images/Logo.png';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const StyledHeaderWrap = styled.header`
  width: 100%;
  height: 213px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 2px #c8c8c8;
`;

const HeaderInner = styled.div`
  width: 1256px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderTop = styled.div`
  height: 126px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTopLeft = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  cursor: pointer;
`;

const HeaderTopRight = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const WelcomeText = styled.div`
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-weight: 500;
  color: #3A4044;
  margin-right: 15px;

  strong {
    font-weight: 700;
    color: #03407E;
  }
`;

const HeaderCategory = styled.div`
  height: 87px;
  display: flex;
  align-items: center;
`;

const CategoryLink = styled(NavLink)`
  width: auto;
  min-width: 102px;
  height: 25px;
  position: relative;
  top: -1px;
  left: -0.53px;
  margin-right: 39.37px;
  padding: 0 10px;

  /* 텍스트 스타일 */
  font-size: 18px;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.9px;

  /* 링크를 일반 텍스트처럼 보이게 */
  color: #3a4044;
  text-decoration: none;

  /* 가로세로 가운데 정렬 */
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: #03407e;
  }

  &.active {
    color: #03407e;
    border-bottom: 2px solid #03407e;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isCompany, isKakaoUser, logout, loading } = useAuth();

  // 로고 클릭 시 홈으로 이동
  const handleLogoClick = () => {
    navigate('/');
  };

  // 메뉴 선택 처리
  const handleMenuSelect = async (menuId) => {
    switch (menuId) {
      case 'profile':
        navigate('/profile');
        break;
      case 'applications':
        navigate('/my-applications');
        break;
      case 'jobManagement':
        navigate('/job-management');
        break;
      case 'applicantManagement':
        navigate('/applicant-management');
        break;
      case 'logout':
        await logout();
        navigate('/');
        break;
      default:
        break;
    }
  };

  // 로딩 중이면 로딩 상태 표시 (선택사항)
  if (loading) {
    return (
      <StyledHeaderWrap>
        <HeaderInner>
          <HeaderTop>
            <HeaderTopLeft onClick={handleLogoClick}>
              <img src={Logo} alt="logo" />
            </HeaderTopLeft>
            <HeaderTopRight>
              {/* 로딩 중 */}
            </HeaderTopRight>
          </HeaderTop>
          <HeaderCategory>
            <CategoryLink to="/">전체 공고 목록</CategoryLink>
          </HeaderCategory>
        </HeaderInner>
      </StyledHeaderWrap>
    );
  }

  return (
    <StyledHeaderWrap>
      <HeaderInner>
        <HeaderTop>
          <HeaderTopLeft onClick={handleLogoClick}>
            <img src={Logo} alt="logo" />
          </HeaderTopLeft>
          <HeaderTopRight>
            {isAuthenticated ? (
              // 로그인 상태
              <>
                {/* 환영 메시지와 프로필 정보 */}
                <WelcomeText>
                  <strong>{user?.name || user?.companyName || '사용자'}</strong>님 환영합니다
                </WelcomeText>
                
                {/* 프로필과 프로필 정보 표시 */}
                <ProfileWithInfo
                  name={user?.name || user?.companyName || '사용자'}
                  subInfo={
                    isCompany 
                      ? `채용 공고: ${user?.jobCount || 0}개`
                      : `지원한 기업: ${user?.applicationCount || 0}`
                  }
                  imageUrl={isKakaoUser ? user?.profileImage : null}
                  notificationCount={user?.notificationCount || 0}
                />
                
                {/* 드롭다운 메뉴 */}
                <ProfileMenu
                  variant={isCompany ? 'company' : 'user'}
                  imageUrl={isKakaoUser ? user?.profileImage : null}
                  notificationCount={user?.notificationCount || 0}
                  onMenuSelect={handleMenuSelect}
                />
              </>
            ) : (
              // 비로그인 상태
              <>
                <LoginButton />
                <CreateUserButton />
              </>
            )}
          </HeaderTopRight>
        </HeaderTop>
        <HeaderCategory>
          {/* 전체 공고 목록은 항상 표시 */}
          <CategoryLink to="/">전체 공고 목록</CategoryLink>
          
          {/* 구직자 탐색은 기업 로그인 시에만 표시 */}
          {isCompany && (
            <CategoryLink to="/search">구직자 탐색</CategoryLink>
          )}
        </HeaderCategory>
      </HeaderInner>
    </StyledHeaderWrap>
  );
};

export default Header;
