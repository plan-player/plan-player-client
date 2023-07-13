interface MainSubTitleProps {
  main: string;
  sub: string;
  size?: 'lg' | 'md' | 'sm';
}

const MainSubTitle = ({ main, sub, size }: MainSubTitleProps) => {
  let mainClass, subClass;

  // TODO: 추후 lg, md 사이즈 정의
  switch (size) {
    case 'lg':
      mainClass = 'text-root';
      subClass = 'text-sm';
      break;
    case 'md':
      mainClass = 'text-root';
      subClass = 'text-sm';
      break;
    case 'sm':
      mainClass = 'text-root';
      subClass = 'text-sm';
      break;
    default:
      mainClass = 'text-md';
      subClass = 'text-sm';
      break;
  }
  return (
    <div className="flex-column gap-xs">
      <p className={subClass}>{sub}</p>
      <p className={mainClass}>{main}</p>
    </div>
  );
};

export default MainSubTitle;
