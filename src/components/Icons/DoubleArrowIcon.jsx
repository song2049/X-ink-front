import styled from 'styled-components';

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.$size || '16px'};
  height: ${props => props.$size || '16px'};
  flex: none;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: transform 0.2s;

  &:hover {
    transform: ${props => props.$clickable ? 'scale(1.2)' : 'none'};
  }
`;

const DoubleArrowSymbol = styled.span`
  font-size: ${props => props.$fontSize || '14px'};
  font-weight: bold;
  color: ${props => props.$color || '#03407E'};
  transform: ${props => props.$rotate};
  display: inline-block;
  line-height: 1;
  letter-spacing: -2px;
`;

/**
 * DoubleArrowIcon - 더블 화살표 아이콘 컴포넌트 (처음/끝 이동용)
 * 
 * @param {string} direction - 'left' (처음으로), 'right' (끝으로)
 * @param {string} size - 아이콘 크기 (기본: '16px')
 * @param {string} fontSize - 폰트 크기 (기본: '14px')
 * @param {string} color - 색상 (기본: '#03407E')
 * @param {function} onClick - 클릭 핸들러
 */
const DoubleArrowIcon = ({ 
  direction = 'right', 
  size = '16px',
  fontSize = '14px',
  color = '#03407E',
  onClick 
}) => {
  const getRotation = () => {
    return direction === 'left' ? 'rotate(180deg)' : 'rotate(0deg)';
  };

  return (
    <IconWrapper 
      $size={size}
      $clickable={!!onClick}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-label={direction === 'left' ? '처음으로' : '끝으로'}
    >
      <DoubleArrowSymbol 
        $fontSize={fontSize}
        $color={color}
        $rotate={getRotation()}
      >
        &gt;&gt;
      </DoubleArrowSymbol>
    </IconWrapper>
  );
};

export default DoubleArrowIcon;

