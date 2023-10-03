import styled from 'styled-components';
import { BiMenuAltLeft } from 'react-icons/bi';
import { TiThList, TiThSmall } from 'react-icons/ti';
import { MdDashboard } from 'react-icons/md';
import CategoryIndex from './CategoryIndex';

interface CategoryIndexBarProps {
  selectedView: string;
  setSelectedView: (data: string) => void;
}

interface IndexsProps {
  indexName: string;
  icon: any;
}

const Wrapper = styled.div`
  margin-top: 3.125rem;
  height: 2vh;
`;

const Indexs: IndexsProps[] = [
  {
    indexName: 'listview',
    icon: <TiThList />,
  },
  {
    indexName: 'dashview',
    icon: <MdDashboard />,
  },
  {
    indexName: 'cardview',
    icon: <TiThSmall />,
  },
];

const CategoryIndexBar = ({ selectedView, setSelectedView }: CategoryIndexBarProps) => {
  return (
    <Wrapper className="w-100 flex-i-center j-between">
      <BiMenuAltLeft />
      <div className="flex">
        {Indexs.map((data: any, idx: number) => (
          <CategoryIndex
            key={idx}
            indexName={data.indexName}
            icon={data.icon}
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default CategoryIndexBar;
