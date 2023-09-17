import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSubmit } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { todoAtom } from '../atoms/todoAtom';
import { isPlayingAtom } from '../atoms/uiAtom';
import CheckButton from '../components/UI/button/CheckButton';
import NavButton from '../components/UI/button/NavButton';
import IconImageHolder from '../components/UI/general/IconImageHolder';
import MainSubTitle from '../components/UI/general/MainSubTitle';
import Timer from '../components/UI/general/Timer';
import ProgressBar from '../components/UI/graph/ProgressBar';
import { fetchRequest } from '../util/request';
import { formatTime } from '../util/time';

const PlayerWrapper = styled.div`
  @media screen and (min-width: 960px) {
    .main-title {
      font-size: var(--text-2xl);
    }

    .sub-title {
      font-size: var(--text-root);
    }

    .timer-time {
      font-size: var(--text-2xxl);
    }
  }
`;

const Player = () => {
  const submit = useSubmit();

  const {
    daily_todo_id,
    category_name,
    todo_emoji,
    title,
    subtitle,
    memo,
    schedule_sum,
    history_sum,
  } = useRecoilValue(todoAtom);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (isPlaying) {
      setStartDate(new Date());
      if (!daily_todo_id) {
        // TODO: 재생할 투두가 없습니다. -> slideMain false로
        alert('시간 추적을 시작할 할 일이 없습니다.');
        setIsPlaying(false);
      }
    } else {
      const endDate = new Date();

      if (!daily_todo_id) {
        return;
      }

      if (endDate.getTime() - startDate.getTime() < 1000) {
        return;
      }

      fetchRequest({
        url: `/api/histories/daily-todos/${daily_todo_id}`,
        method: 'post',
        body: {
          startDate: format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          endDate: format(endDate, 'yyyy-MM-dd HH:mm:ss'),
        },
      });
    }
  }, [isPlaying]);

  return (
    <PlayerWrapper className="w-80 mx-auto flex-column i-center gap-lg">
      <h6 className="bold">{category_name || '.'}</h6>
      <IconImageHolder className="my-sm" isCircle={true} size="3xxl">
        {todo_emoji}
      </IconImageHolder>
      <MainSubTitle
        className="w-100 mb-lg"
        main={title || ''}
        sub={subtitle || ''}
        size="lg"
        isHeading={true}
        isThin={true}
      />

      <Timer className="my-md" defaultTime={history_sum} id={daily_todo_id} />
      <ProgressBar current={60} total={180} />
      <span className="w-100 flex j-end">/{formatTime(schedule_sum || 0, true)}</span>
      <div className="w-80 flex j-between i-center my-md">
        <NavButton to="" />
        {/* finished 없음? */}
        <CheckButton id="player-check-button" defaultChecked={false} />
        <NavButton to="" isNext={true} />
      </div>
      <p className="w-100 break-word text-md">{memo || ''}</p>
    </PlayerWrapper>
  );
};

export default Player;
