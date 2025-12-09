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

const ArrowSymbol = styled.span`
  font-size: ${props => props.$fontSize || '16px'};
  font-weight: bold;
  color: ${props => props.$color || '#03407E'};
  transform: ${props => props.$rotate};
  display: inline-block;
  line-height: 1;
`;

/**
 * ArrowIcon - 방향 화살표 아이콘 컴포넌트
 * 
 * @param {string} direction - 'left', 'right', 'up', 'down'
 * @param {string} size - 아이콘 크기 (기본: '16px')
 * @param {string} fontSize - 폰트 크기 (기본: '16px')
 * @param {string} color - 색상 (기본: '#03407E')
 * @param {function} onClick - 클릭 핸들러
 */
const ArrowIcon = ({ 
  direction = 'right', 
  size = '16px',
  fontSize = '16px',
  color = '#03407E',
  onClick 
}) => {
  const getRotation = () => {
    switch (direction) {
      case 'left':
        return 'rotate(180deg)';
      case 'up':
        return 'rotate(-90deg)';
      case 'down':
        return 'rotate(90deg)';
      case 'right':
      default:
        return 'rotate(0deg)';
    }
  };

  return (
    <IconWrapper 
      $size={size}
      $clickable={!!onClick}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-label={`${direction} 화살표`}
    >
      <ArrowSymbol 
        $fontSize={fontSize}
        $color={color}
        $rotate={getRotation()}
      >
        &gt;
      </ArrowSymbol>
    </IconWrapper>
  );
};

export default ArrowIcon;

