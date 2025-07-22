import {useQuery} from '@tanstack/react-query';

const getNumberOfPages = async (limit: number) => {
  const response = await fetch(location.origin + `/api/tasks?limit=${limit}`);
  const data = await response.json();
  const numberOfPages = data.numberOfPages as number;

  return numberOfPages;
};
const GetNumberOfPages = (limit:number) => {
  return useQuery({
    queryKey: ['GetNumberOfPages', limit],
    queryFn: () => getNumberOfPages(limit)
  });
};

export default GetNumberOfPages;
