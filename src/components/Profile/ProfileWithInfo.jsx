import styled from 'styled-components';
import ProfileAvatar from './ProfileAvatar';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0px;
  gap: 10px;
  margin: 0 auto;
  width: fit-content;
  height: 54px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3px 0px 2.5px;
  height: 46.5px;
  gap: 2.5px;
`;

const Name = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 18.8px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #3A4044;
  white-space: nowrap;
`;

const SubInfo = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #3A4044;
  white-space: nowrap;
`;

/**
 * ProfileWithInfo - 이름과 정보가 포함된 프로필 컴포넌트
 * 
 * @param {string} name - 사용자 이름
 * @param {string} subInfo - 부가 정보 (예: "지원한 기업: 1")
 * @param {string} imageUrl - 프로필 이미지 URL
 * @param {number} notificationCount - 알림 개수
 * @param {function} onAvatarClick - 아바타 클릭 핸들러
 */
const ProfileWithInfo = ({
  name = '사용자',
  subInfo = '',
  imageUrl,
  notificationCount = 0,
  onAvatarClick
}) => {
  return (
    <ProfileContainer>
      <ProfileAvatar
        imageUrl={imageUrl}
        notificationCount={notificationCount}
        onClick={onAvatarClick}
      />
      <InfoContainer>
        <Name>{name}</Name>
        {subInfo && <SubInfo>{subInfo}</SubInfo>}
      </InfoContainer>
    </ProfileContainer>
  );
};

export default ProfileWithInfo;

