import AddTaskForm from '@/app/_Components/_AddTaskForm';
import {Suspense} from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <AddTaskForm />
    </Suspense>
  );
}
