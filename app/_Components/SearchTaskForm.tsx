'use client';
import {Search} from 'lucide-react';
import {Button} from './shadCn/button';
import {Input} from './shadCn/input';
import {FormEvent, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

export function SearchTaskInput() {
  const [search, setSearch] = useState('');
  const route = useRouter();
  function handleOnClick(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    route.push(`?search=${search}`);
  }
  useEffect(() => {
    if (search === '') route.push('/');
  }, [route, search]);
  return (
    <form onSubmit={e => handleOnClick(e)} className='flex gap-x-2 grow'>
      <Input
        className=''
        value={search}
        onChange={e => {
          setSearch(e.target.value);
        }}
        placeholder='Search'
      />
      <Button className='cursor-pointer'>
        <Search />
      </Button>
    </form>
  );
}
