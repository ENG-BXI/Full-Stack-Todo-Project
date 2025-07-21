import {Home, LogOut, PaperclipIcon, Plus} from 'lucide-react';
import {Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from './shadCn/sidebar';
import Link from 'next/link';
import {SignOutButton} from '@clerk/nextjs';

const SideBar = () => {
  return (
    <aside>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href='/'>
                      <Home />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href='/add-task'>
                      <Plus />
                      <span>New ToDo</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href='/categories'>
                      <PaperclipIcon />
                      <span>Categories</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem className='cursor-pointer'>
                  <SidebarMenuButton asChild>
                    <SignOutButton>
                      <span>
                        <LogOut /> Sign Out
                      </span>
                    </SignOutButton>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </aside>
  );
};

export default SideBar;
