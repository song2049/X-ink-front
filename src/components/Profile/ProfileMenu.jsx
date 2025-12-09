import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ProfileAvatar from './ProfileAvatar';
import { UserDropdown, CompanyDropdown } from '../Dropdowns';

const MenuContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 54px;
  height: 54px;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  left: -245.5px;
  top: 70px;
  z-index: 1000;
  
  ${props => props.$variant === 'company' && `
    left: -243px;
    top: 65px;
  `}
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 999;
`;

/**
 * ProfileMenu - 드롭다운 메뉴가 있는 프로필 컴포넌트
 * 
 * @param {string} imageUrl - 프로필 이미지 URL
 * @param {number} notificationCount - 알림 개수
 * @param {string} variant - 'user' 또는 'company' (드롭다운 타입)
 * @param {function} onMenuSelect - 메뉴 선택 시 호출되는 콜백
 */
const ProfileMenu = ({
  imageUrl,
  notificationCount = 0,
  variant = 'user',
  onMenuSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleAvatarClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuSelect = (menuId) => {
    setIsOpen(false);
    if (onMenuSelect) {
      onMenuSelect(menuId);
    }
  };

  const handleOutsideClick = () => {
    setIsOpen(false);
  };

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen]);

  return (
    <>
      <MenuContainer ref={menuRef}>
        <ProfileAvatar
          imageUrl={imageUrl}
          notificationCount={notificationCount}
          onClick={handleAvatarClick}
        />
        
        {isOpen && (
          <DropdownWrapper $variant={variant}>
            {variant === 'user' ? (
              <UserDropdown onSelect={handleMenuSelect} />
            ) : (
              <CompanyDropdown onSelect={handleMenuSelect} />
            )}
          </DropdownWrapper>
        )}
      </MenuContainer>
      
      {isOpen && <Overlay onClick={handleOutsideClick} />}
    </>
  );
};

export default ProfileMenu;

