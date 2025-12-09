import styled from 'styled-components';

const Label = styled.div`
  margin-bottom: 5px;
  width: 590px;
  height: 16px;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: #56575f;
  // *라벨 색상
  & .required {
    color: #2c6aa9;
  }
`;
const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.active ? '#2C6AA9' : '#ffffff')};
  color: ${(props) => (props.active ? '#ffffff' : '#2C6AA9')};
  width: 190px;
  height: 46px;
  border: 1px solid #2c6aa9;
`;

const ButtonSelectGroup = ({ options, value, onChange }) => {
  return (
    <>
      <Label>포지션 *</Label>
      <Wrapper>
        {options.map((opt) => (
          <SelectButton
            key={opt.value}
            active={value === opt.value}
            onClick={() => onChange(opt.value)}
            type="button"
          >
            {opt.label}
          </SelectButton>
        ))}
      </Wrapper>
    </>
  );
};

export default ButtonSelectGroup;
