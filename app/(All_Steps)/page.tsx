import {Plus} from 'lucide-react';
import {Button} from '../_Components/shadCn/button';
import {Card, CardContent, CardHeader, CardTitle} from '../_Components/shadCn/card';
import TodoList from '../_Components/TodoList';
import Link from 'next/link';
import {SearchTaskInput} from '../_Components/SearchTaskForm';
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
            <div className='flex flex-col sm:flex-row items-stretch gap-2'>
              <SearchTaskInput />
              <Link href='/add-task'>
                <Button className='cursor-pointer w-full'>
                  <Plus /> Add Task
                </Button>
              </Link>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TodoList />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
