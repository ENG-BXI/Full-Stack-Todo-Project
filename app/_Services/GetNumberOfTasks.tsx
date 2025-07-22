import {useQuery} from '@tanstack/react-query';

const getNumberOfPages = async (limit: number, search: string, sort: string) => {
  const response = await fetch(location.origin + `/api/tasks?sort=${sort}&search=${search}&limit=${limit}`);
  const data = await response.json();
  const numberOfPages = data.numberOfPages as number;

  return numberOfPages ?? 0;
};
const GetNumberOfPages = (limit: number, search: string, sort: string) => {
  return useQuery({
    queryKey: ['GetNumberOfPages', limit, search, sort],
    queryFn: () => getNumberOfPages(limit, search, sort)
  });
};

export default GetNumberOfPages;
