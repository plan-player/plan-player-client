// props는 디자인 완성 후
import { FaBackwardStep } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { Circle, Label } from "../components/Category/UseCategoryScreen";
import {
  BiMenuAltLeft,
  BiSolidDashboard,
  BiListUl,
  BiSolidGrid,
} from "react-icons/bi";

const CategoryBox = styled.div`
  position: relative;
  margin-top: 1.25rem;
  width: 13.5rem;
  height: 12.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  span:first-child {
    font-size: 40px;
    position: relative;
    margin-top: 20px;
  }
  span:nth-child(2) {
    color: #313338;
    text-align: center;
    font-family: SUIT Variable;
    font-size: 32px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
  span:last-child {
    color: #313338;
    font-family: SUIT Variable;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const IndexBar = styled.div`
  width: 80vw;
  height: 2vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-top: 3.125rem;
`;

const Wrapper = styled.div`
  width: 80vw;
  height: 20.625rem;
  background-color: tomato;
`;

const CategoryDetail = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapper scroll flex-column">
      <FaBackwardStep onClick={() => navigate("/category")} />
      <CategoryBox className="center">
        <span>⚛</span>
        <span>Learn React</span>
        <span className="flex">
          <Circle style={{ position: "relative", marginTop: "0.313rem" }} />
          Study Kim
        </span>
        <div style={{ width: "fit-content" }} className="flex gap-xs">
          <Label>#React</Label>
          <Label>#Course</Label>
          <Label>#fe</Label>
        </div>
      </CategoryBox>
      <IndexBar>
        <BiMenuAltLeft />
        <div className="flex">
          <BiSolidDashboard />
          <BiListUl />
          <BiSolidGrid />
        </div>
      </IndexBar>
      <Wrapper></Wrapper>
    </div>
  );
};

export default CategoryDetail;
