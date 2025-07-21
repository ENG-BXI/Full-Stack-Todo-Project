import {ICategory} from '@/app/_Services/GetAllCategoryOption';
import {PrismaClient} from '@/app/generated/prisma';
import {NextRequest, NextResponse} from 'next/server';
import {IGetTaskById} from './[id]/route';
import {config} from '../api-config';
import {auth} from '@clerk/nextjs/server';

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
    const {userId} = await auth();
    if (!userId) return NextResponse.json({message: 'Cannot Find UserID'}, {status: 400});

    const user = await prisma.user.findUnique({where: {id: userId}});
    const category = formData.category.map(item => {
      const data: ICategory = {
        id: item.id,
        name: item.value
      };
      return data;
    });
    const newTask = await prisma.todo.create({
      data: {
        userId: user!.id,
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
