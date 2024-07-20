import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Box,
  BackgroundImage,
} from '@mantine/core';
import classes from '../styles/AuthenticationTitle.module.css';

function Authentication() {
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
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            variant="filled"
            size="lg"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" size="lg" loading={true} loaderProps={{ type: 'dots' }}>
            Sign in
          </Button>
        </Paper>
      </Box>
    </BackgroundImage>
  );
}

export default Authentication;
