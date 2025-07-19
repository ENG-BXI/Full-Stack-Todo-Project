import {ICategoryWithTask} from './../_Services/GetAllCategory';
import {Button} from '@/app/_components/shadCn/button';
import TableActionButton from './TableActionButton';
import {Badge} from './shadCn/badge';
import {useRouter} from 'next/navigation';
import TaskStatusInTable from './TaskStatusInTable';
import {Card, CardAction, CardContent, CardHeader, CardTitle} from './shadCn/card';
import DeleteCategoryButton from './DeleteCategoryButton';
import EditCategoryButton from './EditCategoryButton';
import {TableHeader, TableRow, TableHead, TableBody, TableCell, Table} from './shadCn/table';

const CategoriesList = ({data, numberOfTasks, numberOfDoneTasks}: {data: ICategoryWithTask[]; numberOfTasks: number[]; numberOfDoneTasks: number[]}) => {
  const route = useRouter();
  return (
    data &&
    data?.length > 0 &&
    data?.map((category, index) => {
      return (
        <Card key={category.id} className='mb-3'>
          <CardHeader>
            <CardTitle>
              Category ( {category.name} ){' '}
              <Badge>
                Done {numberOfDoneTasks[index]} of {numberOfTasks[index]} Tasks
              </Badge>
            </CardTitle>
            <CardAction>
              <EditCategoryButton id={category.id} CategoryName={category.name} /> <DeleteCategoryButton id={category.id} />
            </CardAction>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Expire Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.todo.map(task => {
                  return (
                    <TableRow key={task.id}>
                      <TableCell onClick={() => route.push(`/view-task/${task.id}`)} className='cursor-pointer'>
                        {task.title}
                      </TableCell>
                      <TableCell onClick={() => route.push(`/view-task/${task.id}`)} className='cursor-pointer'>
                        {task.description}
                      </TableCell>
                      <TableCell onClick={() => route.push(`/view-task/${task.id}`)} className='cursor-pointer'>
                        {task.expireDate.toLocaleString().split('T')[0]}
                      </TableCell>
                      <TableCell>
                        <TaskStatusInTable id={task.id} status={task.status} />
                      </TableCell>

                      <TableCell onClick={() => route.push(`/view-task/${task.id}`)} className='cursor-pointer'>
                        {task.priority}
                      </TableCell>
                      <TableCell>
                        <TableActionButton id={task.id} />
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={6} className='font-bold text-center'>
                    <Button onClick={() => route.push(`/add-task?category=${category.name}`)}>Add New Task In {category.name} Category</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      );
    })
  );
};

export default CategoriesList;
