import styled from 'styled-components';
import largeSearchIcon from '../../assets/images/large-search-icon.png';
import smallSearchIcon from '../../assets/images/small-search-icon.svg';

const LargeIconWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  width: 24px;
  height: 24px;
  flex: none;
`;

const LargeIconImage = styled.img`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  width: 24px;
  height: 24px;
  background: #ffffff;
  
`;

const SmallIconWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  width: 14px;
  height: 13.34px;
  flex: none;
`;

const SmallIconImage = styled.img`
  width: 14px;
  height: 13.34px;
`;

/**
 * SearchIcon - 검색 아이콘 컴포넌트
 * 
 * @param {string} size - 'large' (24x24) 또는 'small' (14x13.34)
 * @param {function} onClick - 클릭 핸들러
 */
const SearchIcon = ({ size = 'large', onClick }) => {
  if (size === 'small') {
    return (
      <SmallIconWrapper onClick={onClick} role={onClick ? 'button' : undefined}>
        <SmallIconImage src={smallSearchIcon} alt="검색" />
      </SmallIconWrapper>
    );
  }

  return (
    <LargeIconWrapper onClick={onClick} role={onClick ? 'button' : undefined}>
      <LargeIconImage src={largeSearchIcon} alt="검색" />
    </LargeIconWrapper>
  );
};

export default SearchIcon;

