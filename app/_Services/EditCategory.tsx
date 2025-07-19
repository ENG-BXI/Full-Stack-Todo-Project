import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toast} from 'sonner';

const editCategory = async (id: string, name: string) => {
  const response = await fetch(`http://localhost:3000/api/category/${id}`, {method: 'PATCH', body: JSON.stringify({name: name})});
  const data = await response.json();
  return data;
};

const EditCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['editCategory'],
    mutationFn: ({id, name}: {id: string; name: string}) => editCategory(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['GetAllCategory']
      });
      toast.success('Edit Category Successful');
    }
  });
};

export default EditCategory;
