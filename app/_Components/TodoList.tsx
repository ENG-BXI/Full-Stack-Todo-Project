'use client';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {TableBody, TableRow, TableCell, Table, TableHead, TableHeader} from './shadCn/table';
import {Badge} from './shadCn/badge';
import GetAllTasks from '../_Services/GetAllTasks';
import {ICategory} from '../_Services/GetAllCategoryOption';
import TaskStatusInTable from './TaskStatusInTable';
import TableActionButton from './TableActionButton';
import TablePagination from './TablePagenation';
import GetNumberOfPages from '../_Services/GetNumberOfTasks';
import TableLoading from './TableLoading';
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const {data: todo, isLoading, isError, error} = GetAllTasks({page, limit});
  const {data: NumberOfPages, isLoading: isGetNumberOfPagesLoading, isError: isGetNumberOfPagesError, error: GetNumberOfPagesError} = GetNumberOfPages(limit);
  if (isError) throw new Error(error.message);
  if (isGetNumberOfPagesError) throw new Error(GetNumberOfPagesError.message);
  const route = useRouter();
  return (
    <>
      {isLoading ? (
        <TableLoading />
      ) : (
        <Table>
          <TableHeader>
            <TableRow className='capitalize'>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Expire Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todo!.length > 0 &&
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
                      {item.category.map((cat: ICategory) => (
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
        </Table>
      )}
      {!isGetNumberOfPagesLoading && !isGetNumberOfPagesError && <TablePagination setPage={setPage} page={page} setLimit={setLimit} limit={limit} numberOfPage={NumberOfPages} />}
    </>
  );
};

export default TodoList;
