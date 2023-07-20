import { styled } from 'styled-components';
import { Circle } from '../components/Category/CategoryComponents';
import { BiMenuAltLeft } from 'react-icons/bi';
import { TiThList, TiThSmall } from 'react-icons/ti';
import { useState } from 'react';
import { DUMMY_TODOS } from './Playlist';
import TodoListItem from '../components/Todo/TodoListItem';
import CategoryCard from '../components/Category/CategoryCard';
import NavButton from '../components/UI/button/NavButton';
import { MdDashboard } from 'react-icons/md';
import CategoryDashlist from '../components/Category/CategoryDashlist';
import Label from '../components/UI/general/Label';

const TopMargin = '1.25rem';

const CategoryBox = styled.div`
  width: 13.5rem;
  height: 12.5rem;
  span:first-child {
    margin-top: ${TopMargin};
  }
`;
const IndexBar = styled.div`
  margin-top: 3.125rem;
  height: 2vh;
`;
const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: ${TopMargin};
  margin-bottom: 8rem;
`;

const CategoryDetail = () => {
  const [selectedView, setSelectedView] = useState('listview');
  const isListWrapper = selectedView === 'listview';
  const isDashWrapper = selectedView === 'dashview';
  const isCardWrapper = selectedView === 'cardview';

  return (
    <div className="wrapper scroll flex-column">
      <NavButton to="/category" />
      <CategoryBox className="mx-auto flex-column i-center j-around">
        <span className="text-xxl">⚛</span>
        <span className="text-3xl extra-bold text-black">Learn React</span>
        <span className="flex regular text-sm text-black">
          <Circle style={{ position: 'relative', marginTop: '0.313rem' }} />
          Study Kim
        </span>
        <div className="flex gap-xs">
          <Label size="sm">#React</Label>
          <Label size="sm">#Course</Label>
          <Label size="sm">#fe</Label>
        </div>
      </CategoryBox>

      <IndexBar className="w-100 flex-i-center j-between">
        <BiMenuAltLeft />
        <div className="flex">
          <div>
            <label htmlFor="listview">
              <div className={selectedView === 'listview' ? '' : 'opacityHalf'}>
                <TiThList />
              </div>
            </label>
            <input
              className="hide"
              type="radio"
              id="listview"
              name="radio-buttons"
              checked={selectedView === 'listview'}
              onChange={() => setSelectedView('listview')}
            />
          </div>

          <div>
            <label htmlFor="dashview">
              <div className={selectedView === 'dashview' ? '' : 'opacityHalf'}>
                <MdDashboard />
              </div>
            </label>
            <input
              className="hide"
              type="radio"
              id="dashview"
              name="radio-buttons"
              checked={selectedView === 'dashview'}
              onChange={() => setSelectedView('dashview')}
            />
          </div>

          <div>
            <label htmlFor="cardview">
              <div className={selectedView === 'cardview' ? '' : 'opacityHalf'}>
                <TiThSmall />
              </div>
            </label>
            <input
              className="hide"
              type="radio"
              id="cardview"
              name="radio-buttons"
              checked={selectedView === 'cardview'}
              onChange={() => setSelectedView('cardview')}
            />
          </div>
        </div>
      </IndexBar>

      {isListWrapper && (
        <Wrapper className="w-100 scroll flex-column gap-3xl">
          <ol className="flex-column gap-md">
            {DUMMY_TODOS.map((todo, index) => (
              <TodoListItem key={index} {...todo} />
            ))}
          </ol>
        </Wrapper>
      )}
      {isDashWrapper && (
        <Wrapper className="w-100 scroll flex wrap gap-sm">
          {DUMMY_TODOS.map((todo, index) => (
            <CategoryDashlist key={index} {...todo} />
          ))}
        </Wrapper>
      )}

      {isCardWrapper && (
        <Wrapper className="w-100 scroll gap-sm grid-cols-3">
          {DUMMY_TODOS.map((todo, index) => (
            <CategoryCard key={index} {...todo} />
          ))}
        </Wrapper>
      )}
    </div>
  );
};

export default CategoryDetail;
