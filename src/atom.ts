import { atom, selector } from "recoil";

export enum Category {
  task = 'task',
  in_progress = 'in_progress',
  review = 'review',
  done = 'done',
}

export interface ITaskProp {
  category: 'task' | 'in_progress' | 'review' | 'done'
  id: number
  task: string
}

export const taskAtom = atom<ITaskProp[]>({
  key: 'task',
  default: []
});

export const taskSelector = selector<ITaskProp[]>({
  key: 'taskSelector',
  get: ({get}) => {
    return get(taskAtom).filter((task)=> task.category === Category.task);
  }
});

export const inProgressSelector = selector<ITaskProp[]>({
  key: 'inProgressSelector',
  get: ({get}) => {
    return get(taskAtom).filter((task)=> task.category === Category.in_progress);
  }
});

export const reviewSelector = selector<ITaskProp[]>({
  key: 'reviewSelector',
  get: ({get}) => {
    return get(taskAtom).filter((task)=> task.category === Category.review);
  }
});

export const doneSelector = selector<ITaskProp[]>({
  key: 'doneSelector',
  get: ({get}) => {
    return get(taskAtom).filter((task)=> task.category === Category.done);
  }
});