// Edit Task Arguments
export type EditTaskArgs = {
    taskId: number;
    taskNewTitle: string;
}

// Header types
export type HeaderProps = {
    tasksCounter: number;
}

//Task
export type Task = {
    id: number;
    title: string;
    done: boolean;
}


// Task List Props
export type TasksListProps = {
    tasks: Task[];
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export type TasksItemProps = {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
  }