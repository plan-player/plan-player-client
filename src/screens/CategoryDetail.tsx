import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { todosAtom } from '../atoms/todoAtom';
import NavButton from '../components/UI/button/NavButton';
import CategoryDetailMain from '../components/Category/Detail/CategoryDetailMain';
import CategoryIndexBar from '../components/Category/Detail/CategoryIndexBar';
import ListView from '../components/Category/Detail/View/ListView';
import DashView from '../components/Category/Detail/View/DashView';
import CardView from '../components/Category/Detail/View/CardView';

const CategoryDetail = () => {
  const todos = useRecoilValue(todosAtom);
  const [selectedView, setSelectedView] = useState('listview');
  const ViewData = [
    {
      id: 0,
      name: 'listview',
      view: <ListView todos={todos} />,
    },
    {
      id: 1,
      name: 'dashview',
      view: <DashView todos={todos} />,
    },
    {
      id: 2,
      name: 'cardview',
      view: <CardView todos={todos} />,
    },
  ];

  return (
    <div className="w-100 scroll flex-column border-box p-h-xl">
      <NavButton to="/category" />
      <CategoryDetailMain />
      <CategoryIndexBar selectedView={selectedView} setSelectedView={setSelectedView} />
      {ViewData?.filter((current) => current.name == selectedView)[0].view}
    </div>
  );
};

export default CategoryDetail;
