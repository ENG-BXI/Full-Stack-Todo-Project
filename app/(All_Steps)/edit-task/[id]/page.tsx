'use client';
import {Card, CardContent, CardHeader, CardTitle} from '../../../_Components/shadCn/card';
import {Input} from '../../../_Components/shadCn/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '../../../_Components/shadCn/select';
import {Button} from '../../../_Components/shadCn/button';
import {CalendarIcon} from 'lucide-react';
import {Calendar} from '../../../_Components/shadCn/calendar';
import {useParams, useRouter} from 'next/navigation';
import {FormEvent, useEffect, useState} from 'react';
import {format} from 'date-fns';
import GetAllCategoryOptions from '../../../_Services/GetAllCategoryOption';
import GetTaskById from '@/app/_Services/GetTaskById';
import {MultiSelect, SelectedItems} from '../../../_Components/MultiSelect';
import {ITaskWithSelectedCategory} from '@/app/api/tasks/[id]/route';
import EditTask from '@/app/_Services/EditTask';
import {Popover, PopoverContent, PopoverTrigger} from '../../../_Components/shadCn/popover';
import {useAuth} from '@clerk/nextjs';

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const {userId} = useAuth();
  const route = useRouter();
  const [title, setTitle] = useState('');
  const [accept, setAccept] = useState(false);

  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<SelectedItems[]>([]);
  const [categoryOption, setCategoryOption] = useState<SelectedItems[]>([]);
  const [priority, setPriority] = useState<'high' | 'low' | 'medium'>('low');
  const [expireDate, setExpireDate] = useState<Date>();
  const {data, isLoading, isError} = GetAllCategoryOptions();
  const {data: taskData, isLoading: isTaskLoading, isError: isTaskError} = GetTaskById(id);
  useEffect(() => {
    if (!isTaskLoading && !isTaskError && taskData) {
      setTitle(taskData?.title);
      setDescription(taskData?.description);
      setCategory(taskData?.category);
      setPriority(taskData?.priority);
      setExpireDate(new Date(taskData?.expireDate));
    }
  }, [isTaskLoading, isTaskError, taskData]);
  const {mutate: editTask, isPending} = EditTask();
  function handleOnClick(e: FormEvent) {
    e.preventDefault();
    setAccept(true);
    if (!userId) return;
    if (!title || !description || !category || !priority || !expireDate) return;
    const formData: ITaskWithSelectedCategory = {
      title,
      category,
      description,
      expireDate: expireDate!,
      priority,
      userId
    };
    editTask({id, formData});
  }
  useEffect(() => {
    if (!isLoading && !isError) setCategoryOption(data ?? []);
  }, [data, isError, isLoading]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Task {taskData?.title}</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-y-3'>
        <form onSubmit={handleOnClick}>
          <label>
            Title*
            <Input value={title} onChange={e => setTitle(e.target.value)} />
            {accept && !title && <p className='text-red-500'>Enter Title Please</p>}
          </label>
          <label>
            Description
            <Input value={description} onChange={e => setDescription(e.target.value)} />
            {accept && !description && <p className='text-red-500'>Enter Description Please</p>}
          </label>
          <label>Category</label>
          <MultiSelect SelectedOptions={categoryOption} Selected={category} SelectLabel='Category' setValues={setCategory} />
          {accept && category.length == 0 && <p className='text-red-500'>Select Category Please</p>}
          <label>
            Priority
            <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select Priority'>{priority}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='high'>high</SelectItem>
                <SelectItem value='medium'>medium</SelectItem>
                <SelectItem value='low'>low</SelectItem>
              </SelectContent>
            </Select>
            {accept && !priority && <p className='text-red-500'>Enter Priority Please</p>}
          </label>
          <label>
            Expire Date <br />
            <Popover>
              <PopoverTrigger asChild className='w-full'>
                <Button variant='outline' className='data-[empty=true]:text-muted-foreground justify-start text-left font-normal'>
                  <CalendarIcon />
                  {expireDate ? format(expireDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar mode='single' selected={expireDate!} onSelect={setExpireDate} />
              </PopoverContent>
            </Popover>
            {accept && !expireDate && <p className='text-red-500'>Enter ExpireDate Please</p>}
          </label>
          <div className='flex justify-end gap-x-2 mt-4'>
            <Button disabled={isPending}>{isPending ? 'loading' : 'Done'}</Button>
            <Button type='button' onClick={() => route.back()} variant='outline'>
              Close
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Page;
