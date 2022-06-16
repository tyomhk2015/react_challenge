import { Category, doneSelector, inProgressSelector, ITaskProp, reviewSelector, taskAtom, taskSelector } from '../atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import React from 'react';

interface ITaskList {
  task: ITaskProp, 
  index: number
}

const TaskList: React.FC<ITaskList> = ({task, index}) => {
  const [tasks, setTasks] = useRecoilState(taskAtom);
  const id = task.id;
  console.log(id);

  const changeCategory = (event: React.MouseEvent<HTMLElement>) => {
    console.log(tasks.findIndex((task) => task.id === id));
  }

  return (
    <li key={`${task.category}${index}`}>
      <p>{task.task}</p>
      <div>
        {task.category === Category.task ? null : <button onClick={changeCategory}>Task</button>}
        {task.category === Category.in_progress ? null : <button onClick={changeCategory}>In Progress</button>}
        {task.category === Category.review ? null : <button onClick={changeCategory}>Review</button>}
        {task.category === Category.done ? null : <button onClick={changeCategory}>Done</button>}
      </div>
    </li>
  );
}

export default TaskList;
