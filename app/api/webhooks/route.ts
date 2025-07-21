import {PrismaClient} from '@/app/generated/prisma';
import {verifyWebhook} from '@clerk/nextjs/webhooks';
import {NextRequest} from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const prisma = new PrismaClient();
    // Do something with payload
    // For this guide, log payload to console
    const {id} = evt.data;
    const eventType = evt.type;
    if (eventType === 'user.created') {
      await prisma.user.create({
        data: {
          email: evt.data.email_addresses[0].email_address,
          name: `${evt.data.first_name} ${evt.data.last_name}`,
          password: ''
        }
      });
    }

    console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
    return new Response('Webhook received', {status: 200});
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', {status: 400});
  }
}
