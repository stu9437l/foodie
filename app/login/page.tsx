'use client';

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Box,
  BackgroundImage,
} from '@mantine/core';
import classes from '../styles/AuthenticationTitle.module.css';
import { isNotEmpty, TransformedValues, useForm } from '@mantine/form';
import { login } from '@/utils/apicalls';
import { parseJwt } from '@/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getUser } from '@/hoc/context';

function Authentication() {
  const { setUser } = getUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    email: 'admin@gmail.com',
    password: 'password',
  };
  const form = useForm({
    mode: 'uncontrolled',
    initialValues,
    validate: {
      email: isNotEmpty('Email is required!'),
      password: isNotEmpty('Email is required!'),
    },
  });

  const handleSubmit = async (values: TransformedValues<typeof form>) => {
    setLoading(true);
    console.log({ values });
    try {
      const { token } = await login(values);
      const user = parseJwt(token);
      setUser(user);
      const { admin } = user;
      console.log({ admin });
      if (token && user?.role === 'ADMIN') {
        console.log('am i admin?');
        router.replace('dashboard');
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  console.log({ error: form.errors });

  return (
    <BackgroundImage
      src="https://img.freepik.com/free-vector/food-doodle-frame-beige-background-vector_53876-169007.jpg"
      radius="sm"
      h={'100vh'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Box>
          <Title ta="center" className={classes.title}>
            Welcome back!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Do not have an account yet?{' '}
            <Anchor size="sm" component="button">
              Create account
            </Anchor>
          </Text>
          <Paper w={450} withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              variant="filled"
              size="lg"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              variant="filled"
              size="lg"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button
              fullWidth
              mt="xl"
              size="lg"
              loading={loading}
              loaderProps={{ type: 'dots' }}
              type="submit"
            >
              Sign in
            </Button>
          </Paper>
        </Box>
      </form>
    </BackgroundImage>
  );
}

export default Authentication;
