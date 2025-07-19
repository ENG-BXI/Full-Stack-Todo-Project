import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toast} from 'sonner';

const changeStatusOfTask = async (id: string, status: string) => {
  const response = await fetch(`http://localhost:3000/api/tasks/${id}/changeStatus`, {method: 'PATCH', body: JSON.stringify({status: status})});
  const data = await response.json();
  console.log(response);

  return data;
};
const ChangeStatusOfTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['changeStatusOfTask'],
    mutationFn: ({id, status}: {id: string; status: string}) => changeStatusOfTask(id, status),
    onSuccess: () => {
      toast.success('Change Status Successful');
      queryClient.invalidateQueries({
        queryKey: ['GetAllTasks']
      });
      queryClient.invalidateQueries({
        queryKey: ['GetAllCategory']
      });
    }
  });
};

export default ChangeStatusOfTask;
