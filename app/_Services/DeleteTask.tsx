import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toast} from 'sonner';

async function deleteTask(id: string) {
  return await fetch(location.origin + `/api/tasks/${id}`, {method: 'DELETE'});
}

export function DeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      toast.success('Deleted Successful');
      queryClient.fetchQuery({
        queryKey: ['GetAllTasks']
      });
      queryClient.fetchQuery({
        queryKey: ['GetAllCategory']
      });
    }
  });
}
