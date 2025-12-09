import styled from 'styled-components';
import profilePlaceholder from '../../assets/images/profile.png';

const LargeProfileContainer = styled.div`
  margin: 0 auto;
  width: 300px;
  height: 300px;
  position: relative;
`;

const ProfileImage = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  width: 300px;
  height: 300px;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

/**
 * ProfileLarge - 대형 프로필 이미지 컴포넌트 (300x300px)
 * 
 * @param {string} imageUrl - 프로필 이미지 URL
 * @param {function} onClick - 클릭 이벤트 핸들러
 */
const ProfileLarge = ({ imageUrl, onClick }) => {
  const finalImageUrl = imageUrl || profilePlaceholder;

  return (
    <LargeProfileContainer onClick={onClick}>
      <ProfileImage 
        $imageUrl={finalImageUrl}
        role={onClick ? 'button' : undefined}
        aria-label="프로필 이미지"
      />
    </LargeProfileContainer>
  );
};

export default ProfileLarge;

