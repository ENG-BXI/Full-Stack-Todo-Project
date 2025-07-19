'use client';
import {useQuery} from '@tanstack/react-query';
import {ITodo} from '../_Components/TodoList';
export interface ICategoryWithTask {
  id: string;
  name: string;
  todo: ITodo[];
}

const getAllCategory = async () => {
  const response = await fetch('http://localhost:3000/api/category');
  const data = await response.json();
  return {categories: data.Categories as ICategoryWithTask[], tasks: data.NumberOfTasks as number[], done: data.NumberOfDoneTasks as number[]};
};
const GetAllCategory = () => {
  return useQuery({
    queryKey: ['GetAllCategory'],
    queryFn: getAllCategory
  });
};

export default GetAllCategory;
