'use client';
import {Edit, Loader2, Trash} from 'lucide-react';
import React from 'react';
import {DeleteTask} from '../_Services/DeleteTask';
import {useRouter} from 'next/navigation';

const TableActionButton = ({id}: {id: string}) => {
  const {mutate, isPending} = DeleteTask();
  const route = useRouter();
  async function handleDeleteTask(id: string) {
    if (!isPending) mutate(id);
  }
  return (
    <div className='flex gap-x-1'>
      <Edit onClick={() => route.replace('/edit-task/' + id)} className='text-yellow-500 cursor-pointer' />
      {isPending ? <Loader2 className='animate-spin text-red-500' /> : <Trash onClick={() => handleDeleteTask(id)} className='text-red-500 cursor-pointer' />}
    </div>
  );
};

export default TableActionButton;
