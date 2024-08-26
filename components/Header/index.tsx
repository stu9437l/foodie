'use client';
import { Group, Button, Text, Box, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderMegaMenu.module.css';
import { ActionToggle } from '../ActionToggle';
import { useRouter } from 'next/navigation';

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch('http://localhost:3000/api/v1/logout', {
      method: 'POST',
    });
    console.log({ res: res.formData });
    router.replace('login');
  };

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Text>Today, Monday 23, May 2024</Text>
          <Group visibleFrom="sm">
            {/* <ColorSchemeToggle /> */}

            {/* <Button variant="default">Log in</Button> */}
            <Button onClick={handleLogout}>Logout</Button>
            <ActionToggle />
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>
    </Box>
  );
}
