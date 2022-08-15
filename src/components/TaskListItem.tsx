import { Trash } from "phosphor-react";

import styles from "./TaskListItem.module.css";


interface TaskProps {
  task: {
    id: number;
    title: string;
    isComplete: boolean;
  };
  handleToggleTaskCompletion(id: number): void;
  handleRemoveTask(id: number): void;
}

export function TaskListItem({
  task,
  handleToggleTaskCompletion,
  handleRemoveTask,
}: TaskProps) {
    
  return (
    <li key={task.id} className={styles.tasklistItem}>
      <div className={task.isComplete ? "completed" : ""} data-testid="task">
        <label className={styles.checkboxcontainer}>
          <input
            type="checkbox"
            readOnly
            checked={task.isComplete}
            onClick={() => handleToggleTaskCompletion(task.id)}
          />
          <span className={styles.checkmark}></span>
        </label>
        <p>{task.title}</p>
      </div>

      <button
        type="button"
        data-testid="remove-task-button"
        onClick={() => handleRemoveTask(task.id)}
      >
        <Trash size={16} className={styles.trash}/>
      </button>
    </li>
  );
}
