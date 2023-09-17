import { styled } from 'styled-components';
import CategoryColor from './CategoryColor';
import React, { useState } from 'react';

interface ColorsProps {
  name: string;
  color: string;
}

const Colors: ColorsProps[] = [
  {
    name: 'MINT',
    color: '#B6CECE',
  },
  {
    name: 'SKY',
    color: '#B6C8D9',
  },
  {
    name: 'BLUE',
    color: '#8F9EB5',
  },
  {
    name: 'VIOLET',
    color: '#A09FB9',
  },
  {
    name: 'PINK',
    color: '#EDC9DF',
  },
  {
    name: 'GREEN',
    color: '#A0B99C',
  },
  {
    name: 'YELLOW',
    color: '#F8E49D',
  },
  {
    name: 'ORANGE',
    color: '#EAC0A8',
  },
  {
    name: 'RED',
    color: '#E89C9C',
  },
  {
    name: 'BROWN',
    color: '#807575',
  },
];

const CategoryAddGroupColor = () => {
  const [checkedColor, setCheckedColor] = useState('MINT');
  return (
    <AddGroupColorWrapper className="w-100 p-lg border-box bg-white absolute bottom-0">
      <div className="bg-gray-50 round-lg">
        <AddGroupColorInputWrapper className="flex-i-center j-between round-lg">
          <input
            name="groupName"
            className="text-md semi-bold"
            placeholder="●   추가할 그룹 이름을 입력해 주세요."
          />
          <button
            type="submit"
            value="addColor"
            name="intent"
            className="round-sm text-white bg-primary"
          >
            추가
          </button>
        </AddGroupColorInputWrapper>

        <ColorsWrapper className="bg-gray-50 border-box p-lg round-lg">
          {Colors.map(({ name, color }) => (
            <CategoryColor
              key={name}
              name={name}
              color={color}
              checked={checkedColor === name}
              setChecked={setCheckedColor}
            />
          ))}
        </ColorsWrapper>
      </div>
      <Color
        value={checkedColor}
        onChange={(event: any) => {
          setCheckedColor(event.currentTarget.value);
        }}
        name="color"
      />
    </AddGroupColorWrapper>
  );
};

export default CategoryAddGroupColor;

const Color = styled.input`
  visibility: hidden;
`;

const AddGroupColorWrapper = styled.div`
  min-height: 250px;

  border-radius: 10% 10% 0 0;
  z-index: 100;

  box-shadow: inset 0 0 10px var(--gray-100);
`;

const AddGroupColorInputWrapper = styled.div`
  button {
    margin-right: 10px;

    width: 3.75rem;
    height: 1.875rem;
  }
`;

const ColorsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;

  min-height: 150px;
`;
