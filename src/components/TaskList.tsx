import { useState } from "react";
import { PlusCircle } from "phosphor-react";
import classnames from "classnames";

import { TaskListItem } from "./TaskListItem";
import Clipboard from '../assets/Clipboard.png'
import styles from "./TaskList.module.css";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return;

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    };
    setTasks((state) => [...state, newTask]);
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filterTask = tasks.filter((task) => task.id !== id);
    setTasks(filterTask);
  }

  const filterTaskTrue = tasks.filter((task) => task.isComplete === true);

  return (
    <section className={classnames(styles.tasklist, styles.container)}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          onChange={(e) => setNewTaskTitle(e.target.value)}
          value={newTaskTitle}
        />
        <button
          type="submit"
          data-testid="add-task-button"
          onClick={handleCreateNewTask}
        >
          Criar <PlusCircle size={16} />
        </button>
      </div>

      <main>
        <div className={styles.tarefasText}>
          <p className={styles.tarefasCriadas}>
            Tarefas criadas <span>{tasks.length}</span>
          </p>
          <p className={styles.tarefasConcluidas}>
            Concluídas{" "}
            <span>
              {filterTaskTrue.length}{" "}
              {tasks.length === 0 ? "" : "de"}{" "}
              {tasks.length === 0 ? "" : tasks.length}
            </span>
          </p>
        </div>
        <ul className="list-container">
          {tasks.length === 0 ? (
            <div className={styles.NotTarefaCreate}>
              <img src={Clipboard} />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskListItem
                key={task.id}
                task={task}
                handleToggleTaskCompletion={handleToggleTaskCompletion}
                handleRemoveTask={handleRemoveTask}
              />
            ))
          )}
        </ul>
      </main>
    </section>
  );
}
