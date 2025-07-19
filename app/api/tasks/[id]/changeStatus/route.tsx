import {PrismaClient} from '@/app/generated/prisma';
import {NextRequest, NextResponse} from 'next/server';
import {config} from '../../../api-config';

export {config};
export async function PATCH(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const {status} = await req.json();
  const {id} = await params;
  if (!status) return NextResponse.json({message: 'Not Found Status'}, {status: 400});
  if (status.trim() !== 'Done' && status.trim() !== 'InProgress' && status.trim() !== 'Todo') return NextResponse.json({message: 'Status Not Valid'}, {status: 400});
  if (!id) return NextResponse.json({message: 'Not Found Task Id'}, {status: 400});
  try {
    const prisma = new PrismaClient();
    const newStatus = await prisma.todo.update({
      where: {id},
      data: {status: status.trim()}
    });
    return NextResponse.json({message: 'Update Status Successful', newStatus}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: 'Update Status Failed', error}, {status: 400});
  }
}
