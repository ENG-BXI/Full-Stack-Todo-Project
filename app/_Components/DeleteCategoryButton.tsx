'use client';

import {Loader2} from 'lucide-react';
import DeleteCategory from '../todo_app/app/_Services/DeleteCategory';
import {Button} from '@/app/_components/shadCn/button';

const DeleteCategoryButton = ({id}: {id: string}) => {
  const {mutate, isPending} = DeleteCategory();
  return (
    <Button disabled={isPending} onClick={() => mutate(id)}>
      {isPending ? <Loader2 className='animate-spin' /> : 'Delete'}
    </Button>
  );
};

export default DeleteCategoryButton;
