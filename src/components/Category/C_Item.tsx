import { styled } from "styled-components";
import { FaAtom } from "react-icons/fa";
import { CNameProps } from "../../screens/CategoryGroup";
import shortid from "shortid";

const Item = styled.div`
  width: 5.25rem;
  height: 5.25rem;
  border-radius: 0.5rem;
  background-color: #f7f7f7;
  position: relative;
  top: 2vh;
  left: 1vw;
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
  bottom: -0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Label = styled.div`
  border-radius: 0.194rem;
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

const C_Item = ({ id, CName }: CNameProps) => {
  return (
    <Item key={id}>
      <ItemMain>
        <FaAtom />
        <span>{CName}</span>
      </ItemMain>
      <ItemLabel>
        {LabelMockdata.map((a) => (
          <Label key={shortid.generate()}>
            <span>#{a.name}</span>
          </Label>
        ))}
      </ItemLabel>
    </Item>
  );
};

export default C_Item;
