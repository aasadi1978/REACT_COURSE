import { useRef } from "react";
import useAddTodo from "../hooks/useAddTodo";
import { Todo } from "./services/todoService";

const TodoForm = () => {
  // To invalidate the cache, we need to have ana ccess to the queryClient object in main.tsx.
  // To this end, we use the useQueryClient hook to get the queryClient object

  const ref = useRef<HTMLInputElement>(null);

  const addTodo = useAddTodo(() => {
    if (ref.current) {
      ref.current.value = "";
    }
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (ref.current && ref.current.value) {
      const newTodo: Todo = {
        id: 0,
        title: ref.current.value,
        userId: 1,
        completed: false,
      };
      addTodo.mutate(newTodo);
    }
  };

  return (
    <>
      {addTodo.error && <div className="alert alert-danger">An error occurred: {addTodo.error.message}</div>}

      {addTodo.isLoading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      <form className="row mb-3" onSubmit={handleSubmit}>
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
