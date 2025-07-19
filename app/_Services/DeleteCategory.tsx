import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toast} from 'sonner';

const deleteCategory = async (id: string) => {
  const response = await fetch(location.origin + `/api/category/${id}`, {method: 'DELETE'});
  const data = await response.json();
  console.log(response);

  return data;
};
const DeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteCategory'],
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GetAllCategory']
      });
      toast.success('Delete Category Successful');
    }
  });
};

export default DeleteCategory;
