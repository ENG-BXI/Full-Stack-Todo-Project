import {ICategory} from '@/app/_Services/GetAllCategoryOption';
import {PrismaClient} from '@/app/generated/prisma';
import {NextRequest, NextResponse} from 'next/server';
import {IGetTaskById} from './[id]/route';
import {config} from '../api-config';

export {config};
export async function GET() {
  const prisma = await new PrismaClient();
  let todo;
  try {
    todo = await prisma.todo.findMany({
      include: {
        category: true,
        user: true
      }
    });
  } catch (error) {
    return NextResponse.json({status: 400, error});
  }

  return NextResponse.json({status: 200, todo});
}

export async function POST(req: NextRequest) {
  try {
    const formData: IGetTaskById = await req.json();
    if (!formData.title || !formData.priority || !formData.expireDate || !formData.description || !formData.category) return NextResponse.json({message: 'form data is Not valid'}, {status: 400});

    const prisma = new PrismaClient();
    const category = formData.category.map(item => {
      const data: ICategory = {
        id: item.id,
        name: item.value
      };
      return data;
    });
    const newTask = await prisma.todo.create({
      data: {
        userId: 'fd8d5e20-c67d-4444-8c63-7b4425db85e6',
        title: formData.title,
        description: formData.description,
        expireDate: new Date(formData.expireDate),
        status: 'InProgress',
        priority: formData.priority,
        category: {
          connect: category
        }
      }
    });

    return NextResponse.json({message: 'Add Task Successful', data: newTask}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: 'form data is Not valid', error}, {status: 400});
  }
}
