import { styled } from 'styled-components';
import { useState } from 'react';
import CategoryAddGroupColorInput from './CategoryAddGroupColorInput';
import Colors from './Colors';

const Wrapper = styled.div`
  min-height: 15.625rem;
  border-radius: 10% 10% 0 0;
  z-index: 100;
  box-shadow: inset 0 0 0.625rem var(--gray-100);
`;

const CategoryAddGroupColor = () => {
  const [checkedColor, setCheckedColor] = useState('MINT');
  return (
    <Wrapper className="w-100 p-lg border-box bg-white absolute bottom-0">
      <div className="bg-gray-50 round-lg">
        <CategoryAddGroupColorInput />
        <Colors checkedColor={checkedColor} setCheckedColor={setCheckedColor} />
      </div>

      <input
        className="visibility-hidden"
        value={checkedColor}
        onChange={(event) => {
          setCheckedColor(event.currentTarget.value);
        }}
        name="color"
      />
    </Wrapper>
  );
};

export default CategoryAddGroupColor;
