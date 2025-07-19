import React from 'react'
import { SidebarTrigger } from './shadCn/sidebar';

const Header = () => {
  return (
    <div className='w-full h-10'>
      <SidebarTrigger />
    </div>
  );
}

export default Header