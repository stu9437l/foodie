'use client';

import { Container, Title, Text, Button, Group, NavLink } from '@mantine/core';
import classes from './styles/NothingFoundBackground.module.css';
import { Illustration } from '@/components/Illustration';
import { useRouter } from 'next/navigation';

function NothingFoundBackground() {
  const router = useRouter();
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Group justify="center">
            <Button
              onClick={() => {
                router.push('/');
              }}
            >
              Take me back to home page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}

export default NothingFoundBackground;
