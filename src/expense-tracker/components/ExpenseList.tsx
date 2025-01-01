interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

// NOTE: Since the type of the Props is going to be a expense object, we have to
// define Expense type using interface as above, and then declare the expense in Props
// as an array of the type Expense
interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

// Why do we need onDelete:
//
// Since the list of expenses is passed via props, it is maintained somewhere else, i.e., inside the parent component.
// Since the component that holds a state should be the one updating it, when user clicks on the Delete button, we do not want
// to delete the record here in this component, instead, we want to notify the parent component who consumes this component
// that the expense should be deleted and to do that we need a callback function, this we need onDelete in the Props
//
const ExpenseList = ({ expenses, onDelete }: Props) => {
  // table.table.table-bordered then press Tab key
  return (
    <table className="table table-bordered">
      {/* thead>tr>th*4 */}
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* Here we render our expenses which we do it through Props to make it reusable */}
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>{expense.amount}</td>
            <td>{expense.category}</td>
            <td>
              <button className="btn btn-outline-danger" onClick={() => onDelete(expense.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          {/* .toFixed(2) is display the number in two digits */}
          <td>${expenses.reduce((accumolator, expense) => accumolator + expense.amount, 0).toFixed(2)}</td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpenseList;
