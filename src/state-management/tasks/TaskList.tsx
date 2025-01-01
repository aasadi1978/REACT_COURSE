import { useContext } from "react";
import TaskContext from "./taskContext";
import useAuthStore from "../auth/store";

const useTask = () => useContext(TaskContext);

const TaskList = () => {
  // We use the useTask hook to access the tasks and dispatch function from the TaskContext, i.e., we are opening

  const { tasks, dispatch } = useTask();
  const { user } = useAuthStore();

  return (
    <>
      <button
        onClick={() => dispatch({ type: "ADD_TASK", task: { id: Date.now(), title: "Task " + Date.now() } })}
        className="btn btn-primary my-3"
      >
        Add Task
      </button>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span className="flex-grow-1">
              {user}: {task.title}
            </span>
            <button
              className="btn btn-outline-danger"
              onClick={() => dispatch({ type: "DELETE_TASK", taskId: task.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
