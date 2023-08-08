import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { todoAtom } from '../atoms/todoAtom';
import CheckButton from '../components/UI/button/CheckButton';
import NavButton from '../components/UI/button/NavButton';
import IconImageHolder from '../components/UI/general/IconImageHolder';
import MainSubTitle from '../components/UI/general/MainSubTitle';
import Timer from '../components/UI/general/Timer';
import ProgressBar from '../components/UI/graph/ProgressBar';
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
  const {
    id,
    category_name,
    icon_image_path,
    title,
    subtitle,
    finished,
    memo,
    total_time,
    cur_time,
  } = useRecoilValue(todoAtom);

  return (
    <PlayerWrapper className="w-80 mx-auto flex-column i-center gap-lg">
      <h6 className="bold">{category_name || '.'}</h6>
      <IconImageHolder className="my-sm" isCircle={true} size="3xxl">
        {icon_image_path}
      </IconImageHolder>
      <MainSubTitle
        className="w-100 mb-lg"
        main={title || ''}
        sub={subtitle || ''}
        size="lg"
        isHeading={true}
        isThin={true}
      />

      <Timer className="my-md" defaultTime={cur_time} id={id as number} />
      <ProgressBar current={60} total={180} />
      <span className="w-100 flex j-end">/{formatTime(total_time || 0, true)}</span>
      <div className="w-80 flex j-between i-center my-md">
        <NavButton to="" />
        <CheckButton id="player-check-button" defaultChecked={finished || false} />
        <NavButton to="" isNext={true} />
      </div>
      <p className="w-100 break-word text-md">{memo || ''}</p>
    </PlayerWrapper>
  );
};

export default Player;
