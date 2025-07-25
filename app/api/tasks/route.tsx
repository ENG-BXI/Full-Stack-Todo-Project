import {ICategory} from '@/app/_Services/GetAllCategoryOption';
import {PrismaClient} from '@/app/generated/prisma';
import {NextRequest, NextResponse} from 'next/server';
import {IGetTaskById} from './[id]/route';
import {config} from '../api-config';
import {auth} from '@clerk/nextjs/server';

export {config};
export async function GET(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '5');
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  let orderBy = {};
  if (sort) orderBy = {[sort]: order || 'asc'};
  else orderBy = [{priority: 'asc'}, {expireDate: 'asc'}];
  let numberOfPages: number = 0;
  const prisma = new PrismaClient();
  const {userId} = await auth();

  const skip = (page - 1) * limit;
  let todo = [];
  if (!userId) return NextResponse.json({message: 'Cant Find User id', status: 400}, {status: 400});
  try {
    todo = await prisma.todo.findMany({
      where: {
        AND: [{userId: userId}, {OR: [{title: {contains: search, mode: 'insensitive'}}, {description: {contains: search, mode: 'insensitive'}}]}]
      },
      skip,
      take: limit,
      include: {
        category: {orderBy: sort === 'category' ? {name: 'asc'} : {}},
        user: true
      },
      orderBy: sort !== 'category' ? orderBy : {}
    });

    const countTodo = await prisma.todo.count({
      where: {
        AND: [{userId: userId}, {OR: [{title: {contains: search, mode: 'insensitive'}}, {description: {contains: search, mode: 'insensitive'}}]}]
      }
    });
    numberOfPages = Math.ceil(countTodo / limit);
    return NextResponse.json({status: 200, todo, numberOfPages});
  } catch (error) {
    return NextResponse.json({status: 400, error});
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData: IGetTaskById = await req.json();
    if (!formData.title || !formData.priority || !formData.expireDate || !formData.description || !formData.category) return NextResponse.json({message: 'form data is Not valid'}, {status: 400});

    const prisma = new PrismaClient();
    const {userId} = await auth();
    if (!userId) return NextResponse.json({message: 'Cannot Find UserID'}, {status: 400});

    const category = formData.category.map(item => {
      const data: ICategory = {
        id: item.id,
        name: item.value
      };
      return data;
    });
    const newTask = await prisma.todo.create({
      data: {
        userId: userId,
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
