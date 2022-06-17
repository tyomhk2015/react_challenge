import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ITaskProp, taskAtom, categoryAtom } from '../atom';
import { useRecoilState, useSetRecoilState } from 'recoil';
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

const NewCategoryWrapper = styled.div`
  & > small {
    display: block;
    text-align: center;
    margin-top: 0.2rem;
  }
`;

const CategoryInput = styled.input.attrs(props => ({type: 'text'}))`
  padding: 0.5rem;
  font-size: 1.1rem;
  margin: 1rem auto 0;
  display: block;
`;

const TaskDisplayWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
    flex-wrap: wrap;
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
  const { register, handleSubmit, setValue, reset } = useForm<ITaskProp>();
  const [allTasks, setTask] = useRecoilState(taskAtom);
  const [categories, setCategory] = useRecoilState(categoryAtom);

  const handleOnValid = (data: ITaskProp) => {
    if (data.category === categories.new && data.newCategory !== '') {
      setCategory((oldCategory) => {
        const newCategory = {...oldCategory};
        newCategory[`${data.newCategory}`] = data.newCategory;
        setValue('newCategory', '');
        return newCategory;
      });
      setTask((oldTask) => [{...data, category: data.newCategory, id: Date.now()}, ...oldTask]);
      setValue('task', '');
      return;
    }

    setTask((oldTask) => [{...data, id: Date.now()}, ...oldTask]);
    setValue('task', '');
  }

  useEffect(()=> {
    // Load tasks & categories from the local storage.
    const tasks = JSON.parse(localStorage.getItem('tasks')!);
    const categories = JSON.parse(localStorage.getItem('categories')!);
    console.log(tasks, categories);
    // setTask(
    //   JSON.parse(localStorage.getItem('tasks'))
    // );
  },[]);

  useEffect(()=> {
    // Renew tasks & categories stored in local storage.
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    localStorage.setItem('categories', JSON.stringify(categories));
  },[allTasks, categories]);

  return (
    <TaskWrapper>
      <h2>JIRA TASK</h2>

      <form onSubmit={handleSubmit(handleOnValid)}>
        <TaskCategorySelector {...register("category")}>
          {Object.values(categories).map((category) => {
            return (
                <option key={category} value={category}>
                  {category === 'new' ? 'Add a new category': category.toUpperCase()}
                </option>
              )
          })}
        </TaskCategorySelector>

        <NewCategoryWrapper>
          <CategoryInput {...register("newCategory")} placeholder='Enter new category.' />
          <small>To register a new category, <br />please select 'Add a new category' from the above menu</small>
        </NewCategoryWrapper>

        <TaskInput {...register("task", {required: true})} placeholder='Enter your task' />
        <Submit>Submit</Submit>
      </form>

      <TaskDisplayWrapper>
          {
            Object.values(categories).map((category) => {
              return (
                category !== 'new' && 
                <div key={category}>
                  <h2>{category.toUpperCase()}</h2>
                  <ul>
                    {
                      allTasks.map((task, index) => {
                        return category === task.category && (<TaskList key={`${task.category}${index}`} task={task} index={index}/>);
                      })
                    }
                  </ul>
                </div>
              )
            })
          }
      </TaskDisplayWrapper>
    </TaskWrapper>
  );
}

export default Task;
