'use client';
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
  Grid,
} from '@mantine/core';

function ChangePassword() {
  return (
    <>
      <Box mb={25}>
        <Title order={3}>Change Password</Title>
        <Text>Something meaning Description</Text>
      </Box>
      <Grid>
        <Grid.Col span={5}>
          <PasswordInput variant="filled" label="Current Password" required mb="md" size="lg" />
          <PasswordInput variant="filled" label="New Password" required mb="md" size="lg" />
          <PasswordInput variant="filled" label="Confirm Password" required mb="md" size="lg" />
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={5}>
          <Button fullWidth mt="xl" size="lg">
            Change Password
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ChangePassword;
