import { styled } from "styled-components";
import { AiOutlineUp } from "react-icons/ai";
import C_Item from "./C_Item";
import { CategoryProps } from "../../screens/CategoryGroup";

// 폰트사이즈 우회
// -webkit-transform:scale(0.5); //0.5 -> 50%
// display: inline-block;

const Wrapper = styled.div`
  width: 80vw;
  height: 30vh;
`;
const CTW = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: #313338;
    font-family: SUIT Variable;
    font-size: var(--text-sm);
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
`;
const Circle = styled.div`
  width: 0.313rem;
  height: 0.313rem;
  border-radius: 0.656rem;
  margin-right: 0.313rem;
  background-color: #c3c5cc;
`;
const Text = styled.div`
  width: 80vw;
  height: 4vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ItemWrapper = styled.div`
  width: 70vw;
  height: 26vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const CategoryItems = ({ name, Cate }: CategoryProps) => {
  return (
    <Wrapper>
      <Text>
        <CTW>
          <Circle />
          <span>{name}</span>
        </CTW>
        <AiOutlineUp />
      </Text>

      <ItemWrapper>
        {Cate.map((a, index) => (
          <C_Item key={index} id={a.id} CName={a.CName} />
        ))}
      </ItemWrapper>
    </Wrapper>
  );
};

export default CategoryItems;
