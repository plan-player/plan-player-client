import { styled } from 'styled-components';

interface TimeBlockLabelProps {
  $leftRounded?: boolean;
  $rightRounded?: boolean;
}

interface TimeBlockProps {
  id: string;
  value: number;
  icon?: string;
  bg?: string;
  checked?: boolean;
  leftRounded?: boolean;
  rightRounded?: boolean;
}

const TimeBlockLabel = styled.label<TimeBlockLabelProps>`
  ${({ $leftRounded, $rightRounded }) =>
    `${
      $leftRounded
        ? 'border-top-left-radius: var(--round-xs); border-bottom-left-radius: var(--round-xs);'
        : ''
    };
    ${
      $rightRounded
        ? 'border-top-right-radius: var(--round-xs); border-bottom-right-radius: var(--round-xs);'
        : ''
    };`}
`;

const IconWrapper = styled.span`
  position: absolute;
  left: 0.125rem;
  top: 50%;
  transform: translateY(-50%);
`;

const TimeBlock = ({
  id,
  icon,
  checked,
  value,
  bg,
  leftRounded,
  rightRounded,
}: TimeBlockProps) => {
  return (
    <div className="w-100 relative">
      <IconWrapper className="flex i-center text-sm">{icon}</IconWrapper>
      <TimeBlockLabel
        htmlFor={id}
        className={`inline-block w-100 h-100 pointer ${bg ? 'bg-' + bg : ''}`}
        $leftRounded={leftRounded}
        $rightRounded={rightRounded}
      />
      <input
        id={id}
        className="hide"
        type="checkbox"
        name="time-block"
        value={value}
        checked={checked}
      />
    </div>
  );
};

export default TimeBlock;
