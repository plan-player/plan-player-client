import { styled } from 'styled-components';

interface TimeBlockLabelProps {
  $leftRounded?: boolean;
  $rightRounded?: boolean;
}

interface TimeBlockProps {
  id: string;
  value: number;
  onChange?: (value: number, checked: boolean) => void;
  checked?: boolean;
  disabled?: boolean;
  icon?: string;
  bg?: string;
  opacity?: number;
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
  value,
  onChange,
  checked,
  disabled,
  bg,
  opacity,
  leftRounded,
  rightRounded,
}: TimeBlockProps) => {
  return (
    <div className="w-100 relative">
      <TimeBlockLabel
        htmlFor={id}
        className={`inline-block w-100 h-100 pointer ${bg ? 'bg-' + bg : ''} ${
          opacity ? 'o-' + (opacity * 10).toString() : ''
        }`}
        $leftRounded={leftRounded}
        $rightRounded={rightRounded}
      />
      <input
        id={id}
        className="hide"
        type="checkbox"
        name="time-block"
        value={value}
        onChange={() => {
          onChange && onChange(value, checked || false);
        }}
        checked={checked}
        disabled={disabled}
      />
      <IconWrapper className={`flex i-center text-sm ${opacity === 0.1 ? 'o-2' : ''}`}>
        {icon}
      </IconWrapper>
    </div>
  );
};

export default TimeBlock;
