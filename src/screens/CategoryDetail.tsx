import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { Circle, Label } from '../components/Category/CategoryComponents';
import { BiMenuAltLeft } from 'react-icons/bi';
import { TiThList, TiThSmall } from 'react-icons/ti';
import { useState } from 'react';
import { DUMMY_TODOS } from './Playlist';
import TodoListItem from '../components/Todo/TodoListItem';
import CategoryDetailIcon from '../components/Category/CategoryDetailIcon';
import NavButton from '../components/UI/button/NavButton';

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
  const navigate = useNavigate();

  // const isDashboardWrapper = selectedView === 'l1';
  const isListWrapper = selectedView === 'listview';
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
          <Label>#React</Label>
          <Label>#Course</Label>
          <Label>#fe</Label>
        </div>
      </CategoryBox>

      <IndexBar className="w-100 flex-i-center j-between">
        <BiMenuAltLeft />
        <div className="flex">
          {/* <label typeof="radio" htmlFor="l1">
            <input
              style={{ display: 'none' }}
              type="radio"
              id="l1"
              name="radio-buttons"
              checked={selectedView === 'l1'}
              onChange={() => setSelectedView('l1')}
            />
            <BiSolidDashboard id="l1" />
          </label> */}

          <div>
            <label htmlFor="listview">
              <div className={selectedView === 'listview' ? 'opacityHalf' : ''}>
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
            <label htmlFor="cardview">
              <div className={selectedView === 'cardview' ? 'opacityHalf' : ''}>
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
      {/* {isDashboardWrapper && <Wrapper className="scroll"></Wrapper>} */}

      {isListWrapper && (
        <Wrapper className="w-100 scroll flex-column gap-3xl">
          <ol className="flex-column gap-md">
            {DUMMY_TODOS.map((todo, index) => (
              <TodoListItem key={index} {...todo} />
            ))}
          </ol>
        </Wrapper>
      )}

      {isCardWrapper && (
        <Wrapper className="w-100 scroll gap-sm grid-cols-3">
          {DUMMY_TODOS.map((todo, index) => (
            <CategoryDetailIcon key={index} {...todo} />
          ))}
        </Wrapper>
      )}
    </div>
  );
};

export default CategoryDetail;
