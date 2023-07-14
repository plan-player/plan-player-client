import CategoryItems from "../components/Category/CategoryItems";
import { CategoryMockDataProps } from "../components/Category/UseCategoryScreen";

const CategoryTestData: CategoryMockDataProps[] = [
  {
    name: "Study kim",
    category: [
      {
        id: 0,
        categoryName: "Learn React",
        categoryIcon: "⚛",
        labels: [
          {
            labelID: 0,
            labelName: "React",
          },
          {
            labelID: 1,
            labelName: "Course",
          },
          {
            labelID: 2,
            labelName: "fe",
          },
        ],
      },
      {
        id: 1,
        categoryName: "Algorithm",
        categoryIcon: "🧮",
      },
      {
        id: 2,
        categoryName: "Refactoring 2E",
        categoryIcon: "📚",
      },
    ],
  },
  {
    name: "Project Park",
    category: [
      {
        id: 3,
        categoryName: "During Budget",
        categoryIcon: "🐈‍⬛",
      },
      {
        id: 4,
        categoryName: "Plan Player",
        categoryIcon: "⏯",
      },
    ],
  },
  {
    name: "Fitness Choi",
  },
];

const CategoryGroup = () => {
  return (
    <div className="wrapper scroll">
      {CategoryTestData.map((a, index) => (
        <CategoryItems key={index} name={a.name} category={a.category} />
      ))}
    </div>
  );
};

export default CategoryGroup;
