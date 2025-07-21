import React from 'react';
import {SidebarTrigger} from './shadCn/sidebar';
import {UserButton} from '@clerk/nextjs';

const Header = () => {
  return (
    <div className='w-full h-10 flex justify-between'>
      <SidebarTrigger />
      <UserButton showName />
    </div>
  );
};

export default Header;
