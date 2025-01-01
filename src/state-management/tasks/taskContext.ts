import { Dispatch, createContext } from "react";
import { Task, TaskAction } from "./TaskProvider";

interface TaskContextType {
  tasks: Task[];
  dispatch: Dispatch<TaskAction>; // Dispatch is a generic type
}

// createContext is a generic function to create a context. We provided an empty object as the initial value
// to avoid compilation errors. We will provide the actual value in the App component.
const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export default TaskContext;
