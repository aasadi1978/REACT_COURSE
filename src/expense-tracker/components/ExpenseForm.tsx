import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../categories";

const schema = z.object({
  description: z.string().min(3, { message: "Desc should be at least three characters" }).max(50),
  amount: z.number({ invalid_type_error: "Amount is required!" }).min(0.01).max(100_000),
  // categories must be read only otherwise zod will not accept it. To make it read only, we have to add "as const" to
  // the definition of categories in the App component
  category: z.enum(categories, {
    errorMap: () => ({
      message: "Category is required!",
    }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input id="description" type="text" className="form-control" {...register("description")} />
        {errors.description && <p className="text-danger">{errors.description.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input id="amount" type="number" className="form-control" {...register("amount", { valueAsNumber: true })} />
        {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select id="category" className="form-control" {...register("category")}>
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-danger">{errors.category.message}</p>}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
