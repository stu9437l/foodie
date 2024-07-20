'use client';

import { Button, Group, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Group gap={'sm'}>
      <Button
        variant="default"
        onClick={() => setColorScheme(colorScheme !== 'light' ? 'light' : 'dark')}
      >
        {colorScheme.toString().charAt(0).toUpperCase() + colorScheme.toString().slice(1)} Mode
      </Button>
      {/* <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button> */}
    </Group>
  );
}
