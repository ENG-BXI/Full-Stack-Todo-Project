'use client';
import AddCategoryButton from '@/app/_components/AddCategoryButton';
import CategoriesList from '@/app/_components/CategoriesList';
import {Card, CardAction, CardContent, CardHeader, CardTitle} from '@/app/_components/shadCn/card';
import GetAllCategory from '@/app/_Services/GetAllCategory';
import {Loader2} from 'lucide-react';

const Page = () => {
  const {data, isLoading, isError} = GetAllCategory();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories {isLoading ? <Loader2 className='w-4 h-4 animate-spin inline' /> : data?.categories.length}</CardTitle>
        <CardAction>
          <AddCategoryButton />
        </CardAction>
      </CardHeader>
      <CardContent>{!isLoading && !isError && <CategoriesList data={data!.categories} numberOfTasks={data!.tasks} numberOfDoneTasks={data!.done} />}</CardContent>
    </Card>
  );
};

export default Page;
