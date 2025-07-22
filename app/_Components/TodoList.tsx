'use client';
import React, {useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {TableBody, TableRow, TableCell, Table, TableHead, TableHeader} from './shadCn/table';
import {Badge} from './shadCn/badge';
import GetAllTasks from '../_Services/GetAllTasks';
import {ICategory} from '../_Services/GetAllCategoryOption';
import TaskStatusInTable from './TaskStatusInTable';
import TableActionButton from './TableActionButton';
import TablePagination from './TablePagenation';
import GetNumberOfPages from '../_Services/GetNumberOfTasks';
import TableLoading from './TableLoading';
import {ArrowDownUp} from 'lucide-react';
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
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const sort = searchParams.get('sort') ?? '';
  const order = searchParams.get('order') ?? '';
  const {data: todo, isLoading, isError, error} = GetAllTasks({page, limit, search, sort, order});
  const {data: NumberOfPages, isLoading: isGetNumberOfPagesLoading, isError: isGetNumberOfPagesError, error: GetNumberOfPagesError} = GetNumberOfPages(limit, search, sort);
  if (isError) throw new Error(error.message);
  if (isGetNumberOfPagesError) throw new Error(GetNumberOfPagesError.message);
  const route = useRouter();
  function RouteOrder(value: string) {
    let route = '';
    if (search !== '') route = `?search=${search}&`;
    else route = '?';
    if (sort == '') {
      route += `sort=${value}`;
    } else if (order == '') {
      route += `sort=${value}&order=desc`;
    } else route += `&sort=${value}`;
    return route;
  }
  return (
    <>
      {isLoading ? (
        <TableLoading />
      ) : (
        <Table>
          <TableHeader>
            <TableRow className='capitalize'>
              <TableHead
                onClick={() => {
                  route.push(RouteOrder('title'));
                }}
                className='cursor-pointer'
              >
                Title
                <ArrowDownUp className='inline-block w-3' />
              </TableHead>
              <TableHead
                onClick={() => {
                  route.push(RouteOrder('description'));
                }}
                className='cursor-pointer'
              >
                Description <ArrowDownUp className='inline-block w-3' />
              </TableHead>
              <TableHead
                onClick={() => {
                  route.push(RouteOrder('category'));
                }}
                className='cursor-pointer'
              >
                Category <ArrowDownUp className='inline-block w-3' />
              </TableHead>
              <TableHead
                onClick={() => {
                  route.push(RouteOrder('expireDate'));
                }}
                className='cursor-pointer'
              >
                Expire Date <ArrowDownUp className='inline-block w-3' />
              </TableHead>
              <TableHead
                onClick={() => {
                  route.push(RouteOrder('status'));
                }}
                className='cursor-pointer'
              >
                Status <ArrowDownUp className='inline-block w-3' />
              </TableHead>
              <TableHead
                onClick={() => {
                  route.push(RouteOrder('priority'));
                }}
                className='cursor-pointer'
              >
                Priority <ArrowDownUp className='inline-block w-3' />
              </TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todo &&
              todo.length > 0 &&
              todo.map(item => {
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
      {!isGetNumberOfPagesLoading && !isGetNumberOfPagesError && NumberOfPages && NumberOfPages > 0 ? <TablePagination setPage={setPage} page={page} setLimit={setLimit} limit={limit} numberOfPage={NumberOfPages} /> : ''}
    </>
  );
};

export default TodoList;
