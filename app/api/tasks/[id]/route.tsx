import {SelectedItems} from '@/app/_Components/MultiSelect';
import {ICategory} from '@/app/_Services/GetAllCategoryOption';
import {PrismaClient} from '@/app/generated/prisma';
import {NextRequest, NextResponse} from 'next/server';
import {config} from '../../api-config';

export {config};
export async function DELETE(_res: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  try {
    if (id && typeof id === 'string') {
      const prisma = new PrismaClient();
      await prisma.todo.delete({where: {id}});
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({status: 401, error}, {status: 401});
  }
  return NextResponse.json({status: 200, message: 'Delete Successful', id});
}
export interface IGetTaskById {
  title: string;
  description: string;
  category: SelectedItems[];
  priority: 'low' | 'high' | 'medium';
  expireDate: Date;
}
export async function GET(_res: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const prisma = new PrismaClient();
  try {
    const task = await prisma.todo.findUnique({
      where: {id},
      include: {
        category: true
      }
    });
    if (!task) return NextResponse.json({message: 'Task Not Found', status: 200});
    const taskResponse: IGetTaskById = {
      title: task?.title,
      description: task.description!,
      expireDate: task?.expireDate,
      priority: task?.priority,
      category: task.category.map(item => {
        const data: SelectedItems = {
          id: item.id,
          value: item.name
        };
        return data;
      })
    };
    return NextResponse.json({status: 200, taskResponse});
  } catch (error) {
    return NextResponse.json({status: 401, error});
  }
}

export interface ITaskWithSelectedCategory {
  title: string;
  description: string | null;
  expireDate: Date;
  priority: 'high' | 'medium' | 'low';
  category: SelectedItems[];
  userId: string;
}
export async function PATCH(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  if (!id) return NextResponse.json({message: 'Not Id Found'}, {status: 400});

  const task = (await req.json()) as ITaskWithSelectedCategory;
  if (!task) return NextResponse.json({message: 'Task Body Not Found'}, {status: 400});
  if (!task.userId || !task.title || !task.priority || !task.expireDate || !task.description || !task.category || task.category.length < 0) return NextResponse.json({message: 'Task Body Not Failed'}, {status: 400});
  const prisma = new PrismaClient();
  const category = task.category.map(item => {
    const data: ICategory = {
      id: item.id,
      name: item.value
    };
    return data;
  });
  try {
    const newTask = await prisma.todo.update({
      where: {id},
      data: {
        title: task.title,
        category: {
          connect: category
        },
        description: task.description,
        expireDate: task.expireDate,
        priority: task.priority,
        userId: task.userId
      }
    });

    return NextResponse.json({message: 'Edit successful', newTask}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: 'Edit Failed', error}, {status: 400});
  }
}
