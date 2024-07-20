'use client';
import React from 'react';

import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from '@tabler/icons-react';
import { Group, Code, ScrollArea, rem } from '@mantine/core';
import classes from './NavbarNested.module.css';
import { LinksGroup } from './NavbarLinksGroup';
import { Logo } from '../Logo';
import { UserButton } from '../UserButton/UserButton';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Departments',
    icon: IconNotes,
    // initiallyOpened: true,
    links: [
      { label: 'FinTech', link: '/dashboard/fintech' },
      { label: 'Daphe', link: '/' },
      { label: 'Operation', link: '/' },
      { label: 'Finance', link: '/' },
      { label: 'Business', link: '/' },
      { label: 'Hardware', link: '/' },
    ],
  },
  //   {
  //     label: 'Releases',
  //     icon: IconCalendarStats,
  //     links: [
  //       { label: 'Upcoming releases', link: '/' },
  //       { label: 'Previous releases', link: '/' },
  //       { label: 'Releases schedule', link: '/' },
  //     ],
  //   },
  //   { label: 'Contracts', icon: IconFileAnalytics },
  //   { label: 'Settings', icon: IconAdjustments },
  {
    label: 'Security',
    icon: IconLock,
    links: [{ label: 'Change password', link: '/dashboard/change-password' }],
  },
  { label: 'Vendor', icon: IconPresentationAnalytics },
];

const SideBar = () => {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Logo style={{ width: rem(120) }} />
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
};

export default SideBar;
