import styled from 'styled-components';
import CategoryColor from './CategoryColor';

interface ColorsWrapperProps {
  checkedColor: string;
  setCheckedColor: (data: string) => void;
}

interface ColorsProps {
  name: string;
  color: string;
}

const defaultColors: ColorsProps[] = [
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

const Wrapper = styled.div`
  min-height: 9.375rem;
`;

const Colors = ({ checkedColor, setCheckedColor }: ColorsWrapperProps) => {
  return (
    <Wrapper className="bg-gray-50 border-box p-lg round-lg grid-cols-5 grid-center">
      {defaultColors?.map(({ name, color }: ColorsProps) => (
        <CategoryColor
          key={name}
          name={name}
          color={color}
          checked={checkedColor === name}
          setChecked={setCheckedColor}
        />
      ))}
    </Wrapper>
  );
};

export default Colors;
