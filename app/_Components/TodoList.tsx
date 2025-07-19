'use client';
import React from 'react';
import GetAllTasks from '../todo_app/app/_Services/GetAllTasks';
import {useRouter} from 'next/navigation';
import {TableBody, TableRow, TableCell} from './shadCn/table';
import TableActionButton from './TableActionButton';
import TaskStatusInTable from './TaskStatusInTable';
import {Badge} from './shadCn/badge';
export interface ITodo {
  id: string;
  title: string;
  description: string | null;
  expireDate: Date;
  status: 'Todo' | 'InProgress' | 'Done';
  priority: 'high' | 'medium' | 'low';
  category: {name: string}[];
  userId: string;
}
const TodoList = () => {
  const {data: todo, isLoading, isError, error} = GetAllTasks();
  if (isError) throw new Error(error.message);
  const route = useRouter();
  return (
    <TableBody>
      {!isLoading &&
        todo!.length > 0 &&
        todo!.map(item => {
          return (
            <TableRow key={item.id}>
              <TableCell onClick={() => route.push(`/view-task/${item.id}`)} className='cursor-pointer'>
                {item.title}
              </TableCell>
              <TableCell onClick={() => route.push(`/view-task/${item.id}`)} className='cursor-pointer'>
                {item.description}
              </TableCell>
              <TableCell onClick={() => route.push(`/view-task/${item.id}`)} className='flex gap-1 flex-wrap cursor-pointer'>
                {item.category.map(cat => (
                  <Badge key={cat.name}>{cat.name}</Badge>
                ))}
              </TableCell>
              <TableCell onClick={() => route.push(`/view-task/${item.id}`)} className='cursor-pointer'>
                {item.expireDate.toLocaleString().split('T')[0].split('-').join('/')}
              </TableCell>
              <TableCell>
                <TaskStatusInTable id={item.id} status={item.status} />
              </TableCell>
              <TableCell onClick={() => route.push(`/view-task/${item.id}`)} className='cursor-pointer'>
                <Badge className={`uppercase ${item.priority == 'high' ? 'bg-red-500' : item.priority == 'medium' ? 'bg-yellow-300' : 'bg-green-500'}`}>{item.priority}</Badge>
              </TableCell>
              <TableCell className='flex gap-x-1'>
                <TableActionButton id={item.id} />
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default TodoList;
