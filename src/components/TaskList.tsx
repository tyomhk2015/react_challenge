import { categoryAtom, ITaskProp, taskAtom} from '../atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import React from 'react';

interface ITaskList {
  task: ITaskProp,
  index: number
}

// TODO : Local Storage, Custom Category

const TaskList: React.FC<ITaskList> = ({task, index}) => {
  const [tasks, setTasks] = useRecoilState(taskAtom);
  const categories = useRecoilValue(categoryAtom);
  const id = task.id;

  const changeCategory = (event: React.MouseEvent<HTMLElement>) => {
    const btnCategory = event.currentTarget.getAttribute('value');
    const targetIndex = tasks.findIndex((task) => task.id === id);

    setTasks((oldTasks) => {
      const targetTask = oldTasks.find((task) => task.id === id);
      const oldTaskPrefix = oldTasks.slice(0, targetIndex);
      const oldTaskSuffix = oldTasks.slice(targetIndex + 1);
      const newTasks = [
        ...oldTaskPrefix,
        {...targetTask, category: btnCategory} as ITaskProp,
        ...oldTaskSuffix
      ];
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  }

  return (
    <li key={`${task.category}${index}`}>
      <p>{task.task}</p>
      <div>
        {Object.values(categories).map((category) => {
          return (task.category === category || category === categories.new) ? null : <button key={category} value={category} onClick={changeCategory}>{category.toUpperCase()}</button>
        })}
      </div>
    </li>
  );
}

export default TaskList;
