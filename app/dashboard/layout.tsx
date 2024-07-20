import { Header } from '@/components/Header';
import SideBar from '@/components/NavbarLinksGroup';
import { Box, Container, Flex, Group, ScrollArea } from '@mantine/core';
import React from 'react';
import '@mantine/charts/styles.css';

const DashboardLayout = ({ children }: { children: any }) => {
  return (
    <Flex direction={'row'}>
      <Box>
        <SideBar />
      </Box>
      <Box style={{ width: '100%' }}>
        <Header />
        <Box p={20}>{children}</Box>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
