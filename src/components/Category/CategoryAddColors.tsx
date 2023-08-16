import { styled } from 'styled-components';
import Button from '../UI/button/Button';
import { useState } from 'react';
import CategoryColor from './CategoryColor';

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

const Wrapper = styled.div`
  min-height: 8rem;
`;

const CategoryAddColors = () => {
  const [checkedColor, setCheckedColor] = useState('mint');
  return (
    <div className="bg-gray-50 border-box w-90 round-lg">
      <div className="flex j-between">
        <input placeholder="· 새로운 그룹 추가" />
        <Button className="nowrap" isFit={true}>
          추가
        </Button>
      </div>
      <Wrapper className="auto grid-cols-5 g-center p-md">
        {Colors.map(({ name, color }) => (
          <CategoryColor
            name={name}
            color={color}
            checked={checkedColor === name}
            setChecked={setCheckedColor}
          />
        ))}
      </Wrapper>
    </div>
  );
};

export default CategoryAddColors;
