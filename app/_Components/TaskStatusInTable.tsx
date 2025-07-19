import {useState} from 'react';
import ChangeStatusOfTask from '../todo_app/app/_Services/ChangeStatusOfTask';
import {Badge} from './shadCn/badge';
import {Button} from '@/app/_components/shadCn/button';
import {Check, ListTodo, Loader2, Timer} from 'lucide-react';
import {PopoverTrigger} from './shadCn/popover';

export default function TaskStatusInTable({id, status}: {id: string; status: string}) {
  const [open, setOpen] = useState(false);
  const {mutate, isPending} = ChangeStatusOfTask();
  function handleOnChange(status: string) {
    if (!isPending) {
      mutate({id, status});
      setOpen(false);
    }
  }
  return (
    <Popover open={open} onOpenChange={val => setOpen(val)}>
      <PopoverTrigger>
        <Badge>
          {status}
          {status === 'Done' && <Check />}
          {status === 'InProgress' && <Timer />}
          {status === 'Todo' && <ListTodo />}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className='w-min flex flex-col gap-1'>
        <Button variant={status === 'Done' ? 'outline' : 'default'} onClick={() => handleOnChange('Done')} size='sm'>
          {isPending && status === 'Done' ? <Loader2 className='animate-spin' /> : 'Done'}
        </Button>
        <Button variant={status === 'InProgress' ? 'outline' : 'default'} onClick={() => handleOnChange('InProgress')} size='sm'>
          {isPending && status === 'InProgress' ? <Loader2 className='animate-spin' /> : 'InProgress'}
        </Button>
        <Button variant={status === 'Todo' ? 'outline' : 'default'} onClick={() => handleOnChange('Todo')} size='sm'>
          {isPending && status === 'Todo' ? <Loader2 className='animate-spin' /> : 'Todo'}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
