import {Plus} from 'lucide-react';
import {Button} from '../_Components/shadCn/button';
import {Card, CardContent, CardHeader, CardTitle} from '../_Components/shadCn/card';
import {Input} from '../_Components/shadCn/input';
import {Table, TableHead, TableHeader, TableRow} from '../_Components/shadCn/table';
import TodoList from '../_Components/TodoList';
import Link from 'next/link';
// import {PrismaClient} from './generated/prisma';

const page = async () => {
  // const prisma = new PrismaClient();
  // const todoAdd = await prisma.todo.create({
  //   data: {title: 'Gp gym Now', description: 'Go Description', status: 'Todo', expireDate: new Date(), priority: 'high', category: {connect: {id: 'db3cffe3-5d20-4b96-858c-abbdaf93dc88'}}, userId: '81b6d736-96d6-4ef2-8740-454e9c72fe8c'}
  // });
  // console.log(todoAdd);


  return (
    <div className=''>
      <Card>
        <CardHeader>
          <CardTitle className='flex flex-col gap-y-4'>
            <h1>ToDo App</h1>
            <div className='flex gap-x-2'>
              <Input className='' placeholder='Search' />
              <Link href='/add-task'>
                <Button className='cursor-pointer'>
                  <Plus /> Add Task
                </Button>
              </Link>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
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
            <TodoList />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
