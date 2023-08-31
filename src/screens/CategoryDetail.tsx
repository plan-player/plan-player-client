import { useState } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { MdDashboard } from 'react-icons/md';
import { TiThList, TiThSmall } from 'react-icons/ti';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { todosAtom } from '../atoms/todoAtom';
import CategoryCard from '../components/Category/CategoryCard';
import { Circle } from '../components/Category/CategoryComponents';
import CategoryDashlist from '../components/Category/CategoryDashlist';
import TodoListItem from '../components/Todo/TodoListItem';
import NavButton from '../components/UI/button/NavButton';
import Label from '../components/UI/general/Label';
import { useMatch } from 'react-router';
import { categoryGroupAtom } from '../atoms/categoryAtom';

const TopMargin = '1.25rem';

const CategoryBox = styled.div`
  width: 13.5rem;
  height: 11.5rem;

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

  @media screen and (min-width: 500px) {
    grid-row-gap: 1.5rem;
  }
  grid-row-gap: 0.75rem;
`;

const CategoryDetail = () => {
  const todos = useRecoilValue(todosAtom);
  const getCategory = useRecoilValue(categoryGroupAtom);

  const pathMatch = useMatch('/category/:groupId/:categoryId');
  const selectedGroupId = pathMatch?.params.groupId;
  const selectedCategoryId = pathMatch?.params.categoryId;

  const currentGroup = getCategory?.filter(
    (current: { category_group_id: number | string }) =>
      current.category_group_id == selectedGroupId
  );
  const data = currentGroup[0]?.category_list?.filter(
    (current: { category_id: string | number }) =>
      current.category_id == selectedCategoryId
  );

  const [selectedView, setSelectedView] = useState('listview');
  const isListWrapper = selectedView === 'listview';
  const isDashWrapper = selectedView === 'dashview';
  const isCardWrapper = selectedView === 'cardview';

  return (
    <div className="w-100 scroll flex-column border-box p-h-xl">
      <NavButton to="/category" />
      <CategoryBox className="mx-auto flex-column i-center j-around">
        <span className="text-xxl">{data[0]?.emoji}</span>
        <span className="text-3xl extra-bold text-black">{data[0]?.category_name}</span>
        <span className="flex regular text-sm text-black">
          <Circle style={{ position: 'relative', marginTop: '0.313rem' }} />
          {data[0]?.category_group_name}
        </span>
        <div className="flex gap-xs">
          {data[0]?.tagName?.map((tag: string, idx: number) => (
            <Label key={idx} size="sm">
              #{tag}
            </Label>
          ))}
        </div>
      </CategoryBox>

      <IndexBar className="w-100 flex-i-center j-between">
        <BiMenuAltLeft />
        <div className="flex">
          <div>
            <label htmlFor="listview">
              <div className={selectedView === 'listview' ? '' : 'o-3'}>
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
              <div className={selectedView === 'dashview' ? '' : 'o-3'}>
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
              <div className={selectedView === 'cardview' ? '' : 'o-3'}>
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
            {todos.map((todo, index) => (
              <TodoListItem key={index} {...todo} />
            ))}
          </ol>
        </Wrapper>
      )}
      {isDashWrapper && (
        <Wrapper className="w-100 scroll flex wrap gap-sm">
          {todos.map((todo, index) => (
            <CategoryDashlist key={index} {...todo} />
          ))}
        </Wrapper>
      )}

      {isCardWrapper && (
        <Wrapper className="w-100 scroll gap-sm grid-cols-3 grid-center">
          {todos.map((todo, index) => (
            <CategoryCard key={index} {...todo} />
          ))}
        </Wrapper>
      )}
    </div>
  );
};

export default CategoryDetail;
