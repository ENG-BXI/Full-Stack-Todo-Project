import {PrismaClient} from '@/app/generated/prisma';
import {NextRequest, NextResponse} from 'next/server';
import {config} from '../../api-config';

export {config};
export async function PATCH(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const {name} = await req.json();
  const {id} = await params;
  if (!name) return NextResponse.json({message: 'Category Name Failed'}, {status: 400, statusText: 'Category Name Failed'});
  try {
    const prisma = new PrismaClient();
    const EditedCategory = await prisma.category.update({
      where: {id},
      data: {name}
    });
    return NextResponse.json({message: 'Edit Category Successful', EditedCategory}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: 'Create Category Failed', error}, {status: 400});
  }
}

export async function DELETE(_req: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const prisma = new PrismaClient();
  try {
    await prisma.todo.deleteMany({where: {category: {every: {id}}}});
    const deletedCategory = await prisma.category.delete({
      where: {id}
    });

    return NextResponse.json({message: 'Deleted Successful', deletedCategory}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: 'Deleted Failed', error}, {status: 400});
  }
}
