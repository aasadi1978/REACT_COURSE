import { useReducer, ReactNode } from "react";
import TaskContext from "./taskContext";

export interface Task {
  id: number;
  title: string;
}

interface AddTask {
  type: "ADD_TASK";
  task: Task;
}

interface DeleteTask {
  type: "DELETE_TASK";
  taskId: number;
}

export type TaskAction = AddTask | DeleteTask;

const tasksRedcuers = (tasks: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [action.task, ...tasks];

    case "DELETE_TASK":
      return tasks.filter((t) => t.id != action.taskId);
  }
};

interface Props {
  children: ReactNode;
}

const TaskProvider = ({ children }: Props) => {
  const [tasks, dispatch] = useReducer(tasksRedcuers, []);
  return <TaskContext.Provider value={{ tasks, dispatch }}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
