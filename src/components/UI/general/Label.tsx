import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const defaultLabelPaddingSize = '0.188rem 0.125rem';
interface LabelSizeProps {
  size?: string;
}

interface LabelStyledProps {
  $isSize?: string;
}

const LabelWrapper = styled.div<LabelStyledProps>`
  background-color: var(--gray-200);
  padding: ${({ $isSize }) =>
    $isSize ? `var(--p-${$isSize})` : `${defaultLabelPaddingSize}`};
`;

const Label = ({ children, size }: PropsWithChildren<LabelSizeProps>) => {
  return (
    <LabelWrapper
      className="semi-bold text-white text-2xs round-xs nowrap"
      $isSize={size}
    >
      {children}
    </LabelWrapper>
  );
};

export default Label;
