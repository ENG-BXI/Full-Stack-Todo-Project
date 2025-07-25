'use client';
import AddCategoryButton from '@/app/_Components/AddCategoryButton';
import CategoriesList from '@/app/_Components/CategoriesList';
import {Card, CardAction, CardContent, CardHeader, CardTitle} from '@/app/_Components/shadCn/card';
import GetAllCategory from '@/app/_Services/GetAllCategory';
import {Loader2} from 'lucide-react';

const Page = () => {
  const {data, isLoading, isError} = GetAllCategory();

  return (
    <Card>
      <CardHeader className='flex gap-4 sm:justify-between items-stretch flex-col sm:flex-row'>
        <CardTitle>Categories {isLoading && !isError ? <Loader2 className='w-4 h-4 animate-spin inline' /> : data?.categories?.length}</CardTitle>
        <CardAction className='w-full sm:w-min'>
          <AddCategoryButton />
        </CardAction>
      </CardHeader>
      <CardContent>{!isLoading && !isError && <CategoriesList data={data!.categories} numberOfTasks={data!.tasks} numberOfDoneTasks={data!.done} />}</CardContent>
    </Card>
  );
};

export default Page;
