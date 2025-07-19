'use client';
import {useQuery} from '@tanstack/react-query';
import { SelectedItems } from '../_Components/MultiSelect';

export interface ICategory {
  id?: string;
  name: string;
}
export interface ITask {
  title: string;
  description: string;
  category: ICategory[];
  priority: 'low' | 'high' | 'medium';
  expireDate: Date;
}
const getAllCategoryOption = async () => {
  const response = await fetch(location.origin + '/api/category');
  const category = await response.json();
  const SelectedItems: SelectedItems[] = category.Categories.map((item: ICategory) => {
    const data: SelectedItems = {
      id: item.id!,
      value: item.name
    };
    return data;
  });

  return SelectedItems;
};
const GetAllCategoryOptions = () => {
  return useQuery({
    queryKey: ['GetAllCategoryOptions'],
    queryFn: getAllCategoryOption
  });
};

export default GetAllCategoryOptions;
