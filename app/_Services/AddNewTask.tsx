import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {IGetTaskById} from '../api/tasks/[id]/route';

const addNewTask = async (formData: IGetTaskById) => {
  console.log(formData);

  try {
    const response = await fetch(location.origin + '/api/tasks', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    console.log(response);

    if (!response.ok) throw new Error('Error');
  } catch (error) {
    toast.error('Add Failed  ' + error);
  }
};
const AddNewTask = () => {
  const route = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addNewTask'],
    mutationFn: (formData: IGetTaskById) => addNewTask(formData),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['GetAllTasks']
      });
      toast.success('Add Successful');
      route.replace('/');
    }
  });
};

export default AddNewTask;
