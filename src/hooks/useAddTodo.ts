import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../react-query/constants";
import todoService, { Todo } from "../react-query/services/todoService";

interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAddCleanUp: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoService.post,

    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>([CACHE_KEY_TODOS]) || [];

      queryClient.setQueryData<Todo[]>([CACHE_KEY_TODOS], (oldTodos) => [...(oldTodos || []), newTodo]);

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>([CACHE_KEY_TODOS], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );

      //   queryClient.invalidateQueries({ queryKey: [CACHE_KEY_TODOS] });

      // Approach 02: Is updating the cache; we tell React Query to update the cache with the new data
      // Using oldTodos = [] as a default value for the oldTodos parameter we prevent the oldTodos from being undefined
      queryClient.setQueryData<Todo[]>([CACHE_KEY_TODOS], (oldTodos = []) => [savedTodo, ...oldTodos]);

      // We call the onAddCleanUp callback function to clear the input field
      onAddCleanUp();
    },

    onError: (error, newTodo, context) => {
      if (!context) return; // If context is undefined, we return
      // If something goes wrong, we revert the cache to the previous state
      queryClient.setQueryData<Todo[]>([CACHE_KEY_TODOS], context.previousTodos);
    },

    // We also have onError, onSettled, onMutate, onQueryStarted, onQuerySucceded, onQueryError
  });
};

export default useAddTodo;
