import { HiCheck } from 'react-icons/hi';
import { styled } from 'styled-components';

const CategoryColorWrapper = styled.div<CategoryColorStyledProps>`
  background-color: ${({ $color }) => ($color ? $color : 'inherit')};
`;

const Check = styled.div`
  svg {
    fill: white;
  }
`;

interface CategoryColorStyledProps {
  $color?: string;
}

interface CategoryColorsProps {
  name: string;
  color: string;
  checked: boolean;
  setChecked: (value: string) => void;
}

const CategoryColor = ({ name, color, checked, setChecked }: CategoryColorsProps) => {
  return (
    <CategoryColorWrapper
      $color={color}
      className="bg-light flex j-center i-center size-md round-md"
      onClick={() => {
        setChecked(name);
      }}
    >
      <label htmlFor={name} />
      <input
        className="hide"
        id={name}
        type="radio"
        // checked={checked}
        defaultChecked={checked}
      />
      {checked && (
        <Check>
          <HiCheck />
        </Check>
      )}
    </CategoryColorWrapper>
  );
};

export default CategoryColor;
