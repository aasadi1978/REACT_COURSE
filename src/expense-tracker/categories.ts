// We moved categories list to a seperate module outsdide components folder because
// when used this list in other module, e.g., ExpenseForm.tsx, we got an error saying that "categories cannot be used before initialization"
// As a result, we decided to create an independent module and improt it in module
const categories = ["Utilities", "Groceries", "Entertainment"] as const;
export default categories;
