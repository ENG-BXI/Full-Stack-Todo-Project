import React from 'react';
import {Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from './shadCn/pagination';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './shadCn/select';

const TablePagination = ({setPage, page, setLimit, limit, numberOfPage}: {setPage: React.Dispatch<React.SetStateAction<number>>; page: number; setLimit: React.Dispatch<React.SetStateAction<number>>; limit: number; numberOfPage?: number}) => {
  return (
    <div className='flex items-center justify-center mt-10 mx-10'>
      <div className='flex items-center gap-x-3 text-nowrap'>
        Number Of Row
        <Select defaultValue={limit.toString()} onValueChange={e => setLimit(+e)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='5'>5</SelectItem>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='15'>15</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Pagination className='w-20!'>
        <PaginationContent>
          <PaginationItem
            className='cursor-pointer'
            onClick={() =>
              setPage(prev => {
                return prev > 1 ? prev - 1 : prev;
              })
            }
          >
            <PaginationPrevious />
          </PaginationItem>
          {numberOfPage &&
            Array.from({length: numberOfPage}, (_, i) => i).map(index => {
              return (
                <PaginationItem onClick={() => setPage(index + 1)} className={`cursor-pointer rounded-lg ${index + 1 === page && 'bg-black text-white'}`} key={index}>
                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              );
            })}
          <PaginationItem
            className='cursor-pointer'
            onClick={() =>
              setPage(prev => {
                return numberOfPage && numberOfPage > prev ? prev + 1 : prev;
              })
            }
          >
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePagination;
