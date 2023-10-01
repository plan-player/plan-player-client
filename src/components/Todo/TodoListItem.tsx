import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { DailyTodoType, todoAtom } from '../../atoms/todoAtom';
import { isPlayingAtom, slideMainAtom } from '../../atoms/uiAtom';
import { fetchRequest } from '../../util/request';
import { formatTime } from '../../util/time';
import OptionButton from '../UI/button/OptionButton';
import PlayPauseButton from '../UI/button/PlayPauseButton';
import IconImageHolder from '../UI/general/IconImageHolder';
import MainSubTitle from '../UI/general/MainSubTitle';

const TodoListItem = (todo: DailyTodoType) => {
  const navigate = useNavigate();

  const { daily_todo_id, title, category_name, todo_emoji, category_emoji, history_sum } =
    todo;

  const setTodoAtom = useSetRecoilState(todoAtom);
  const setIsPlaying = useSetRecoilState(isPlayingAtom);
  const setSlideMain = useSetRecoilState(slideMainAtom);

  // TODO: DraggableItem 개발

  const setPlayerHandler = () => {
    setTodoAtom(todo);

    setIsPlaying(true);

    // NOTE: 모바일 사이즈 기기에서 좌측으로 슬라이드
    if (window.innerWidth < 960) {
      setSlideMain(true);
    }

    return;
  };

  const menu = [
    {
      name: '상세보기',
      action: () => {
        // TODO: todo 상세 페이지로 이동
        navigate('to todo detail page');
      },
    },
    {
      name: '삭제하기',
      action: () => {
        fetchRequest({
          url: `/api/daily-todos/${daily_todo_id}`,
          method: 'delete',
        });
        // TODO: 삭제 내용 반영하여 리스트 새로고침
      },
    },
  ];

  return (
    <div className="flex i-center gap-sm">
      <PlayPauseButton />
      <div className="w-100 flex j-between i-center">
        <div className="flex i-center gap-sm break-word m-sm">
          <IconImageHolder>{todo_emoji || category_emoji}</IconImageHolder>
          <MainSubTitle main={title} sub={category_name} />
        </div>
        <div className="flex">
          <span className="text-sm mx-md flex i-center shrink-0">
            {formatTime(history_sum)}
          </span>
          <OptionButton menu={menu} />
        </div>
      </div>
    </div>
  );
};

export default TodoListItem;
