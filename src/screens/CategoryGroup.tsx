import { styled } from "styled-components";
import CategoryItems from "../components/Category/CategoryItems";
import AddCategory from "../components/UI/nav/AddCategory";

const Wrapper = styled.div`
  width:80vw;
  height:80vh;
  left:0;
  right:0;
  margin:0 auto;
  overflow-y: scroll;
`;


const CategoryGroup = () => {
  return <Wrapper>
    <CategoryItems/>
    <CategoryItems/>
    <CategoryItems/>
  </Wrapper>;
};

export default CategoryGroup;
