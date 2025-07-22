import {Skeleton} from './shadCn/skeleton';
import {Table, TableBody, TableCell, TableHeader, TableRow} from './shadCn/table';

const TableLoading = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>
            <Skeleton className='h-6 bg-gray-300' />
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Skeleton className='h-6 bg-gray-300' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className='h-6 bg-gray-300' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className='h-6 bg-gray-300' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className='h-6 bg-gray-300' />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className='h-6 bg-gray-300' />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TableLoading;
