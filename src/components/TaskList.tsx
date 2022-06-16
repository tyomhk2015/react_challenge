import { Category, ITaskProp, taskAtom} from '../atom';
import { useRecoilState } from 'recoil';
import React from 'react';

interface ITaskList {
  task: ITaskProp,
  index: number
}

// TODO : Local Storage, Custom Category

const TaskList: React.FC<ITaskList> = ({task, index}) => {
  const [tasks, setTasks] = useRecoilState(taskAtom);
  const id = task.id;

  const changeCategory = (event: React.MouseEvent<HTMLElement>) => {
    const btnCategory = event.currentTarget.getAttribute('value');
    const targetIndex = tasks.findIndex((task) => task.id === id);

    setTasks((oldTasks) => {
      const targetTask = oldTasks.find((task) => task.id === id);
      const oldTaskPrefix = oldTasks.slice(0, targetIndex);
      const oldTaskSuffix = oldTasks.slice(targetIndex + 1);
      return [
        ...oldTaskPrefix,
        {...targetTask, category: btnCategory} as ITaskProp,
        ...oldTaskSuffix
      ];
    });
  }

  return (
    <li key={`${task.category}${index}`}>
      <p>{task.task}</p>
      <div>
        {task.category === Category.task ? null : <button value={Category.task} onClick={changeCategory}>Task</button>}
        {task.category === Category.in_progress ? null : <button value={Category.in_progress} onClick={changeCategory}>In Progress</button>}
        {task.category === Category.review ? null : <button value={Category.review} onClick={changeCategory}>Review</button>}
        {task.category === Category.done ? null : <button value={Category.done} onClick={changeCategory}>Done</button>}
      </div>
    </li>
  );
}

export default TaskList;
