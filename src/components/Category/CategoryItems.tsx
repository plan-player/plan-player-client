import { styled } from "styled-components";
import { AiOutlineUp } from "react-icons/ai";
import { FaAtom } from "react-icons/fa";

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
  width: 5px;
  height: 5px;
  border-radius: 10.5px;
  margin-right: 5px;
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
  width: 80vw;
  height: 26vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const Item = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 8px;
  background-color: #f7f7f7;
  position: relative;
  top: 2vh;
  left: 4vw;
  background-color: #f7f7f7;
`;
const ItemMain = styled.div`
  position: relative;
  top: 1.5vh;
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 80%;
  height: 60%;
  justify-content: center;
  align-items: center;
  span {
    -webkit-transform: scale(0.7);
    display: inline-block;
    font-size: var(--text-xs);
    color: #828794;
    font-family: SUIT Variable;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
`;

// 같이 수정해보아요!
const ItemLabel = styled.div`
  width: 80%;
  height: 20%;
  left: 0;
  right: 0;
  margin: 0 auto;
  position: relative;
  bottom: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Label = styled.div`
  border-radius: 3.1px;
  background-color: #c3c5cc;
  span {
    -webkit-transform: scale(0.5);
    display: inline-block;
    font-size: var(--text-xs);
    color: #fff;
    font-family: SUIT Variable;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
`;

// 추후 백엔드 api에 따라 수정필요.
const LabelMockdata: { name: string }[] = [
  {
    name: "React",
  },
  {
    name: "Course",
  },
  {
    name: "fe",
  },
];

const CategoryItems = () => {
  return (
    <Wrapper>
      <Text>
        <CTW>
          <Circle />
          <span>Study kim</span>
        </CTW>
        <AiOutlineUp />
      </Text>

      <ItemWrapper>
        <Item>
          <ItemMain>
            <FaAtom />
            <span>Learn React</span>
          </ItemMain>
          <ItemLabel>
            {LabelMockdata.map((a) => (
              <Label>
                <span>#{a.name}</span>
              </Label>
            ))}
          </ItemLabel>
        </Item>

        <Item>
          <ItemMain>
            <FaAtom />
            <span>Algorithm</span>
          </ItemMain>
        </Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
      </ItemWrapper>
    </Wrapper>
  );
};

export default CategoryItems;
