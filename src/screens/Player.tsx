import CheckButton from '../components/UI/button/CheckButton';
import NavButton from '../components/UI/button/NavButton';
import IconImageHolder from '../components/UI/general/IconImageHolder';
import MainSubTitle from '../components/UI/general/MainSubTitle';
import Timer from '../components/UI/general/Timer';
import ProgressBar from '../components/UI/graph/ProgressBar';

const DUMMY_DATA = {
  category: { icon: '📑', title: 'Category Here' },
  title: 'Todo Title Here',
  subtitle: 'Subtitle',
  isDone: false,
  memo: 'memomemomemomemomemomemomemomemomemomemomemo',
};

const Player = () => {
  const { category, title, subtitle, isDone, memo } = DUMMY_DATA;

  return (
    <div className="w-80 mx-auto flex-column i-center gap-sm">
      <h6 className="bold">{category.title}</h6>
      <IconImageHolder className="my-md" isCircle={true} size="3xxl">
        {category.icon}
      </IconImageHolder>
      <MainSubTitle
        className="w-100"
        main={title}
        sub={subtitle}
        size="lg"
        isHeading={true}
        isThin={true}
      />

      <Timer className="my-md" />
      <ProgressBar current={60} total={180} />
      <span className="w-100 flex j-end">/00:00:00</span>
      <div className="w-80 flex j-between i-center my-md">
        <NavButton to="" />
        <CheckButton id="player-check-button" defaultChecked={isDone} />
        <NavButton to="" isNext={true} />
      </div>
      <p className="w-100 break-word text-md">{memo}</p>
    </div>
  );
};

export default Player;
