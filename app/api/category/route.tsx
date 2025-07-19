import {PrismaClient} from '@/app/generated/prisma';
import {NextRequest, NextResponse} from 'next/server';

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const Categories = await prisma.category.findMany({
      include: {todo: true}
    });
    const NumberOfTasks = Categories.map(item => {
      return item.todo.length;
    });
    const NumberOfDoneTasks = Categories.map(item => {
      return item.todo.filter(task => task.status === 'Done').length;
    });
    return NextResponse.json({status: 200, Categories, NumberOfTasks, NumberOfDoneTasks});
  } catch (error) {
    return NextResponse.json({status: 401, error});
  }
}
export async function POST(req: NextRequest) {
  const {name} = await req.json();
  console.log(name);
  if (!name) return NextResponse.json({message: 'Category Name Failed'}, {status: 400, statusText: 'Category Name Failed'});
  const prisma = new PrismaClient();
  try {
    const newCategory = await prisma.category.create({data: {name}});
    return NextResponse.json({message: 'Create Category Successful', newCategory}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: 'Create Category Failed', error}, {status: 400});
  }
}
