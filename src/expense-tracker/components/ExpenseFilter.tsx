// This component is purely responsible for showing filters, however, the act of filtering
// will be done in the App component as that is where we maintain the state
// This means that when user selects a filter, we should notify the App componenent and the
// App component will take the filtering of the data

import categories from "../categories";

interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <select className="form-select" onChange={(event) => onSelectCategory(event.target.value)}>
      <option value="">All categories</option>
      {categories.map((cat) => (
        <option value={cat} key={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default ExpenseFilter;
