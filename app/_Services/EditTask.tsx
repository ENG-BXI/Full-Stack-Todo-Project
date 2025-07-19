import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import { ITaskWithSelectedCategory } from '../api/tasks/[id]/route';

const editTask = async (id: string, formData: ITaskWithSelectedCategory) => {
  console.log(formData, id);

  try {
    const response = await fetch(location.origin + `/api/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(formData)
    });
    if (!response.ok) throw new Error('Error');
  } catch (error) {
    toast.error('Edit Failed  ' + error);
    throw new Error('Error' + error);
  }
};
const EditTask = () => {
  const route = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['EditTask'],
    mutationFn: ({id, formData}: {id: string; formData: ITaskWithSelectedCategory}) => editTask(id, formData),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['GetAllTasks']
      });
      toast.success('Edit Successful');
      route.replace('/');
    }
  });
};

export default EditTask;
