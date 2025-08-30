import React, { useState } from 'react';
import SideMenu from '../SideMenu';
import Header from '../Header';

const Layout = ({ children }) => {
    const [sideMenuOpen, setSideMenuOpen] = useState(true);
  return (
    <main className='flex w-screen h-screen relative'>
      <SideMenu sideMenuOpen={sideMenuOpen} setSideMenuOpen={setSideMenuOpen} />

      <div className={sideMenuOpen ?'w-full sm:w-[calc(100vw-250px)]':'w-full pl-[65px] sm:pl-0 sm:w-[calc(100vw-65px)]'}>
        <Header />
        <div className='h-[calc(100vh-79px)] overflow-auto w-full'>
          <React.Fragment>{children}</React.Fragment>
        </div>
      </div>
    </main>
  );
};

export default Layout;
