import { SizeType } from '../../../types/size';

interface MainSubTitleProps {
  main: string;
  sub: string;
  className?: string;
  size?: 'lg' | 'md' | 'sm';
  isHeading?: boolean;
  isThin?: boolean;
}

const MainSubTitle = ({
  main,
  sub,
  className,
  size,
  isHeading,
  isThin,
}: MainSubTitleProps) => {
  let mainSize: SizeType = 'md';
  let subSize: SizeType = 'xs';

  switch (size) {
    case 'lg':
      mainSize = 'xl';
      subSize = 'md';
      break;
    case 'md':
      mainSize = 'root';
      subSize = 'sm';
      break;
    case 'sm':
      mainSize = 'md';
      subSize = 'xs';
      break;
  }
  return (
    <div className={`flex-column gap-xs ${className || ''}`}>
      <p className={`sub-title text-${subSize}`}>{sub}</p>
      {isHeading ? (
        <h1 className={`main-title text-${mainSize} ${isThin ? 'regular' : ''}`}>
          {main}
        </h1>
      ) : (
        <p className={`main-title text-${mainSize}`}>{main}</p>
      )}
    </div>
  );
};

export default MainSubTitle;
