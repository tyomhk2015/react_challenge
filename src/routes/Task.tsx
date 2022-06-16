import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ITaskProp, taskAtom, taskSelector, Category, inProgressSelector, reviewSelector, doneSelector } from '../atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import TaskList from '../components/TaskList';

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h2 {
    font-size: 2rem;
  }
`;

const TaskCategorySelector = styled.select`
  width: 100%;
  font-size: 1.2rem;
  padding: 0.5rem;
  text-align: center;
  margin-top: 1rem;
`

const TaskInput = styled.input.attrs(props => ({type: 'text'}))`
  width: 200%;
  padding: 0.5rem;
  margin-top: 1rem;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.1rem;
`;

const TaskDisplayWrapper = styled.div`
  width: 200%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin-top: 1rem;
  gap: 1rem;
  color: ${(props) => props.theme.textColor};

  & h2 {
    text-align: center;
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
    font-style: italic;
  }

  & > div {
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 4px;
    padding: 0.5rem;
  }

  & ul {
    overflow: auto;
    height: 212px;
  }

  & li {
    display: flex;
    justify-content: space-between;
    line-height: 2;
    border-bottom: 1px solid  ${(props) => props.theme.textColor};

    & button:not(:last-of-type) {
      margin-right: 4px;
    }
  }
`;

const Submit = styled.button`
  padding: 1rem;
  margin: 1rem auto;
  font-size: 1.2rem;
  display: block;
`;

const Task = () => {
  const { register, handleSubmit, setValue } = useForm<ITaskProp>();
  const setTask = useSetRecoilState(taskAtom);
  const tasks = useRecoilValue(taskSelector);
  const inProgressTasks = useRecoilValue(inProgressSelector);
  const reviewTasks = useRecoilValue(reviewSelector);
  const doneTasks = useRecoilValue(doneSelector);

  const handleOnValid = (data: ITaskProp) => {
    setTask((oldTask) => [{...data, id: Date.now()}, ...oldTask]);
    setValue('task', '');
  }
  console.log(tasks);

  return (
    <TaskWrapper>
      <h2>JIRA TASK</h2>

      <form onSubmit={handleSubmit(handleOnValid)}>
        <TaskCategorySelector {...register("category")}>
          <option value={Category.task}>Task</option>
          <option value={Category.in_progress}>In progress</option>
          <option value={Category.review}>Review</option>
          <option value={Category.done}>Done</option>
        </TaskCategorySelector>

        <TaskInput {...register("task", {required: true})} placeholder='Enter your task' />
        <Submit>Submit</Submit>
      </form>

      <TaskDisplayWrapper>
        <div>
          <h2>Task</h2>
          {
            tasks &&
              <ul>
                {tasks.map((task, index) => <TaskList key={`${task.category}${index}`} task={task} index={index}/>)}
              </ul>
          }
        </div>
        <div>
          <h2>In progress</h2>
          {
            inProgressTasks &&
              <ul>
                {inProgressTasks.map((task, index) => <TaskList key={`${task.category}${index}`} task={task} index={index}/>)}
              </ul>
          }
        </div>
        <div>
          <h2>Review</h2>
          {
            reviewTasks &&
              <ul>
                {reviewTasks.map((task, index) => <TaskList key={`${task.category}${index}`} task={task} index={index}/>)}
              </ul>
          }
        </div>

        <div>
          <h2>Done</h2>
          {
            doneTasks &&
              <ul>
                {doneTasks.map((task, index) => <TaskList key={`${task.category}${index}`} task={task} index={index}/>)}
              </ul>
          }
        </div>
      </TaskDisplayWrapper>
    </TaskWrapper>
  );
}

export default Task;
