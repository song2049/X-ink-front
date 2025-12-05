import styled from 'styled-components';
import Dropdown from '../../components/Dropdown/Dropdown';
import Button from '../../components/Buttons/Button';
import Text from '../../components/Texts/Text';
import Input from '../../components/Inputs/Input';

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

/**
 * SearchSection - 검색 및 필터 영역
 * @param {function} onSearch - 검색 버튼 클릭 핸들러
 * @param {function} onFilterChange - 필터 변경 핸들러
 * @param {Array} filterOptions - 필터 옵션 배열
 */
const SearchSection = ({ onSearch, onFilterChange, filterOptions }) => {
  return (
    <SectionWrapper>
      <FilterRow>
        <Dropdown
          label="전체"
          options={filterOptions || ['전체', '블록체인', '프론트', '백엔드']}
          onChange={onFilterChange}
        />
        <Text variant="title">관련 공고들을 모았어요!</Text>
      </FilterRow>

      <SearchRow>
        <Input
          variant="search"
          maxWidth="100%"
          placeholder="검색어를 입력해주세요."
        />
        <Button label="검색" variant="blue" size="sm" onClick={onSearch} />
      </SearchRow>
    </SectionWrapper>
  );
};

export default SearchSection;

