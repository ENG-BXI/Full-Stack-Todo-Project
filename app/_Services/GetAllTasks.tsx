import {useQuery} from '@tanstack/react-query';
import {ITodo} from '../_Components/TodoList';

const getAllTasks = async () => {
  const response = await fetch('http://localhost:3000/api/tasks');
  const data = await response.json();
  const tasks = data.todo as ITodo[];
  return tasks;
};
const GetAllTasks = () => {
  return useQuery({
    queryKey: ['GetAllTasks'],
    queryFn: getAllTasks
  });
};

export default GetAllTasks;
