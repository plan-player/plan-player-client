import { useSetRecoilState } from 'recoil';
import { TodoType, todoAtom } from '../../atoms/todoAtom';
import { isPlayingAtom, slideMainAtom } from '../../atoms/uiAtom';
import { formatTime } from '../../util/time';
import ContextButton from '../UI/button/ContextButton';
import PlayPauseButton from '../UI/button/PlayPauseButton';
import IconImageHolder from '../UI/general/IconImageHolder';
import MainSubTitle from '../UI/general/MainSubTitle';

const TodoListItem = (todo: TodoType) => {
  const { title, category_name, icon_image_path, cur_time } = todo;

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

  return (
    <li>
      <div onClick={setPlayerHandler} className="flex i-center gap-sm">
        <PlayPauseButton />
        <div className="w-100 flex j-between">
          <div className="flex i-center gap-sm break-word">
            <IconImageHolder>{icon_image_path}</IconImageHolder>
            <MainSubTitle main={title} sub={category_name} />
          </div>
          <div className="flex">
            <span className="text-sm mx-md flex i-center shrink-0">
              {formatTime(cur_time)}
            </span>
            <ContextButton />
          </div>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
