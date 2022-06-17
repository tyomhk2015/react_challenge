import { atom, selector } from "recoil";

interface ICategoryTypes {
  [key: string]: string;
}

export interface ITaskProp {
  category: string;
  id: number
  task: string
  newCategory: string;
}

export const categoryAtom = atom<ICategoryTypes>({
  key: 'category',
  default: {
    task: 'task',
    in_progress: 'in_progress',
    review: 'review',
    done: 'done',
    new: 'new'
  }
});

export const taskAtom = atom<ITaskProp[]>({
  key: 'task',
  default: []
});

export const taskSelector = selector<ITaskProp[]>({
  key: 'taskSelector',
  get: ({get}) => {
    return get(taskAtom).filter((task)=> task.category === get(categoryAtom).task);
  }
});

export const inProgressSelector = selector<ITaskProp[]>({
  key: 'inProgressSelector',
  get: ({get}) => {
    return get(taskAtom).filter((task)=> task.category === get(categoryAtom).in_progress);
  }
});

export const reviewSelector = selector<ITaskProp[]>({
  key: 'reviewSelector',
  get: ({get}) => {
    return get(taskAtom).filter((task)=> task.category === get(categoryAtom).review);
  }
});

export const doneSelector = selector<ITaskProp[]>({
  key: 'doneSelector',
  get: ({get}) => {
    return get(taskAtom).filter((task)=> task.category === get(categoryAtom).done);
  }
});