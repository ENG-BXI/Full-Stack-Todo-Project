import {useQuery} from '@tanstack/react-query';
import {IGetTaskById} from '../api/tasks/[id]/route';

const getTaskById = async (id: string) => {
  if (!id) throw new Error('Write A Id');
  const response = await fetch(location.origin + `/api/tasks/${id}`);
  const data = await response.json();

  return data.taskResponse as IGetTaskById;
};

const GetTaskById = (id: string) => {
  return useQuery({queryKey: ['getTaskById', id], queryFn: () => getTaskById(id)});
};

export default GetTaskById;
