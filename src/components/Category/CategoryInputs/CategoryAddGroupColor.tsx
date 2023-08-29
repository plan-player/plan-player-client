import { styled } from 'styled-components';
import CategoryColor from './CategoryColor';
import { useState } from 'react';

interface ColorsProps {
  name: string;
  color: string;
}

const Colors: ColorsProps[] = [
  {
    name: 'mint',
    color: '#B6CECE',
  },
  {
    name: 'sky',
    color: '#B6C8D9',
  },
  {
    name: 'blue',
    color: '#8F9EB5',
  },
  {
    name: 'violet',
    color: '#A09FB9',
  },
  {
    name: 'pink',
    color: '#EDC9DF',
  },
  {
    name: 'green',
    color: '#A0B99C',
  },
  {
    name: 'yellow',
    color: '#F8E49D',
  },
  {
    name: 'orange',
    color: '#EAC0A8',
  },
  {
    name: 'red',
    color: '#E89C9C',
  },
  {
    name: 'brown',
    color: '#807575',
  },
];

const CategoryAddGroupColor = () => {
  const [checkedColor, setCheckedColor] = useState('mint');
  return (
    <AddGroupColorWrapper className="w-100 p-lg border-box bg-white absolute bottom-0">
      <div className="bg-gray-50 round-md">
        <AddGroupColorInputWrapper className="flex-i-center j-between">
          <input className="text-lg semi-bold" placeholder="· 새로운 그룹 추가" />
          <button className="round-sm text-white bg-primary">추가</button>
        </AddGroupColorInputWrapper>

        <ColorsWrapper className="bg-gray-50 border-box p-lg">
          {Colors.map(({ name, color }) => (
            <CategoryColor
              name={name}
              color={color}
              checked={checkedColor === name}
              setChecked={setCheckedColor}
            />
          ))}
        </ColorsWrapper>
      </div>
    </AddGroupColorWrapper>
  );
};

export default CategoryAddGroupColor;

const AddGroupColorWrapper = styled.div`
  min-height: 250px;

  border-radius: 10% 10% 0 0;
  z-index: 100;
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
