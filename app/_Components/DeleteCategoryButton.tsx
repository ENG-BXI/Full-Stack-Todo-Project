'use client';

import {Loader2} from 'lucide-react';
import DeleteCategory from '../_Services/DeleteCategory';
import {Button} from '@/app/_Components/shadCn/button';

const DeleteCategoryButton = ({id}: {id: string}) => {
  const {mutate, isPending} = DeleteCategory();
  return (
    <Button className='cursor-pointer grow  sm:w-min' disabled={isPending} onClick={() => mutate(id)}>
      {isPending ? <Loader2 className='animate-spin' /> : 'Delete'}
    </Button>
  );
};

export default DeleteCategoryButton;
