import {useQuery} from '@tanstack/react-query';
import {ITodo} from '../_Components/TodoList';

const getAllTasks = async (page: number, limit: number) => {
  const response = await fetch(location.origin + `/api/tasks?page=${page}&limit=${limit}`);
  const data = await response.json();
  const tasks = data.todo as ITodo[];

  return tasks;
};
const GetAllTasks = ({page, limit}: {page: number; limit: number}) => {
  return useQuery({
    queryKey: ['GetAllTasks', page, limit],
    queryFn: () => getAllTasks(page, limit)
  });
};

export default GetAllTasks;
