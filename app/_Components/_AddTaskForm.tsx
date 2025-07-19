'use client';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './shadCn/select';
import {CalendarIcon} from 'lucide-react';
import {useRouter, useSearchParams} from 'next/navigation';
import {FormEvent, useEffect, useState} from 'react';
import {format} from 'date-fns';
import {IGetTaskById} from '@/app/api/tasks/[id]/route';
import {MultiSelect, SelectedItems} from './MultiSelect';
import AddNewTask from '../_Services/AddNewTask';
import GetAllCategoryOption from '../_Services/GetAllCategoryOption';
import {Card, CardHeader, CardTitle, CardContent} from './shadCn/card';
import {Input} from './shadCn/input';
import {Button} from './shadCn/button';
import {Popover, PopoverContent, PopoverTrigger} from './shadCn/popover';
import {Calendar} from './shadCn/calendar';

const AddTaskForm = () => {
  const route = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<SelectedItems[]>([]);
  const [categoryOption, setCategoryOption] = useState<SelectedItems[]>([]);
  const [priority, setPriority] = useState<'high' | 'low' | 'medium'>('low');
  const [expireDate, setExpireDate] = useState<Date>();
  const {data, isLoading, isError} = GetAllCategoryOption();
  const {mutate: addNewTask, isPending} = AddNewTask();
  const SearchParams = useSearchParams();
  const ParamCategory = SearchParams.get('category');
  function handleOnClick(e: FormEvent) {
    e.preventDefault();
    if (!title && !description && !category && !priority && !expireDate) return;
    const formData: IGetTaskById = {
      title,
      category,
      description,
      expireDate: expireDate!,
      priority
    };
    addNewTask(formData);
  }
  useEffect(() => {
    if (categoryOption.length > 0) {
      const SelectedCategoryFromParam = categoryOption.find(item => {
        return item.value.trim() == ParamCategory?.trim();
      });
      if (SelectedCategoryFromParam)
        setCategory(prev => {
          return [...prev, SelectedCategoryFromParam];
        });
    }
  }, [ParamCategory, categoryOption]);
  useEffect(() => {
    if (!isLoading && !isError) setCategoryOption(data ?? []);
  }, [data, isError, isLoading]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-y-3'>
        <form onSubmit={handleOnClick}>
          <label>
            Title*
            <Input value={title} onChange={e => setTitle(e.target.value)} />
          </label>
          <label>
            Description
            <Input value={description} onChange={e => setDescription(e.target.value)} />
          </label>
          <label>Category</label>
          <MultiSelect SelectedOptions={categoryOption} Selected={category} SelectLabel='Category' setValues={setCategory} />
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

export default AddTaskForm;
