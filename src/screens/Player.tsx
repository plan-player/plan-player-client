import { styled } from 'styled-components';
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
  memo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies sem sapien, id ullamcorper mi mollis nec. Aenean velit lacus, volutpat et turpis ac, fermentum pharetra ante. Donec interdum ex sed arcu iaculis facilisis. Praesent arcu mauris, porta finibus nisl quis, posuere facilisis odio. Mauris mollis justo sit amet ante pellentesque feugiat. Sed volutpat arcu sit amet nunc commodo, non finibus tellus hendrerit. Donec mattis tristique risus quis ornare. Phasellus ullamcorper, tellus vitae consequat fermentum, urna nunc semper velit, id tristique enim tellus in nulla. Praesent at commodo leo. Donec mollis purus at pretium pretium. Nullam rutrum tempor leo in lacinia. Donec fringilla mauris in nisl mollis pulvinar. Maecenas aliquam sit amet leo et hendrerit. Maecenas accumsan neque efficitur lacus tincidunt dignissim. Sed mattis porttitor hendrerit. Vivamus gravida vehicula risus et laoreet. Ut sollicitudin ultricies dolor sed dictum. Aliquam pharetra commodo dui, vel maximus velit fringilla eget. Etiam quis ante et lectus vestibulum blandit eu sed urna. Vivamus gravida, lacus a ultricies interdum, erat lacus scelerisque erat, nec interdum odio massa eget arcu. Morbi commodo elit elit, quis euismod mauris placerat ut. I',
};

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
  const { category, title, subtitle, isDone, memo } = DUMMY_DATA;

  return (
    <PlayerWrapper className="w-80 mx-auto flex-column i-center gap-lg">
      <h6 className="bold">{category.title}</h6>
      <IconImageHolder className="my-sm" isCircle={true} size="3xxl">
        {category.icon}
      </IconImageHolder>
      <MainSubTitle
        className="w-100 mb-lg"
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
    </PlayerWrapper>
  );
};

export default Player;
