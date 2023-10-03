interface CategoryIndexProps {
  indexName: string;
  icon: any;
  selectedView: string;
  setSelectedView: (data: string) => void;
}

const CategoryIndex = ({
  indexName,
  icon,
  selectedView,
  setSelectedView,
}: CategoryIndexProps) => {
  return (
    <div>
      <label htmlFor={indexName} className="pointer">
        <div className={selectedView === indexName ? '' : 'o-3'}>{icon}</div>
      </label>
      <input
        className="hide"
        type="radio"
        id={indexName}
        name="radio-buttons"
        checked={selectedView === indexName}
        onChange={() => setSelectedView(indexName)}
      />
    </div>
  );
};

export default CategoryIndex;
