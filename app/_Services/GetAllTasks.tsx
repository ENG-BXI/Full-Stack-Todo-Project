import {useQuery} from '@tanstack/react-query';
import {ITodo} from '../_Components/TodoList';

const getAllTasks = async (page: number, limit: number, search: string, sort: string, order: string) => {
  let apiRoute = location.origin + '/api/tasks/?';
  if (sort !== '') apiRoute += `sort=${sort}&`;
  if (search !== '') apiRoute += `search=${search}&`;
  if (order !== '') apiRoute += `order=${order}&`;

  apiRoute += `page=${page}&limit=${limit}`;

  const response = await fetch(apiRoute);

  const data = await response.json();
  return data.todo as ITodo[];
};
const GetAllTasks = ({page, limit, search, sort, order}: {page: number; limit: number; search: string; sort: string; order: string}) => {
  return useQuery({
    queryKey: ['GetAllTasks', page, limit, search, sort, order],
    queryFn: () => getAllTasks(page, limit, search, sort, order)
  });
};

export default GetAllTasks;
