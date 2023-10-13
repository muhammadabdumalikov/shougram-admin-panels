import React from 'react';
import { Layout as DefaultLayout, LayoutProps } from 'react-admin';

const Layout = (props: LayoutProps) => {
  return (
    // <DefaultLayout {...props} menu={Menu} appBar={() => <CustomAppBar />} />
    <DefaultLayout {...props} />
  );
};

export default Layout;
