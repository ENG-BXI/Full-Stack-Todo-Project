import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toast} from 'sonner';

const addNewCategory = async (name: string) => {
  const response = await fetch('http://localhost:3000/api/category', {method: 'POST', body: JSON.stringify({name: name})});
  const data = await response.json();
  return data;
};

const AddNewCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['addNewCategory'],
    mutationFn: (name: string) => addNewCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GetAllCategory']
      });
      toast.success('Add Category Successful');
    }
  });
};

export default AddNewCategory;
