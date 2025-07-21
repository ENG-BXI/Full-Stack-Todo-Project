import {PrismaClient} from '@/app/generated/prisma';
import {NextRequest, NextResponse} from 'next/server';
import {config} from '../api-config';
import {auth} from '@clerk/nextjs/server';

export {config};
export async function GET() {
  const prisma = new PrismaClient();
  const {userId} = await auth();
  if (userId)
    try {
      const Categories = await prisma.category.findMany({
        where: {id: userId},
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
  const {userId} = await auth();
  if (userId)
    try {
      const newCategory = await prisma.category.create({data: {name, userId: userId}});
      return NextResponse.json({message: 'Create Category Successful', newCategory}, {status: 200});
    } catch (error) {
      return NextResponse.json({message: 'Create Category Failed', error}, {status: 400});
    }
}
