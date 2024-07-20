'use client';

import { useDisclosure } from '@mantine/hooks';
import {
  Modal,
  Button,
  Grid,
  TextInput,
  Box,
  FileInput,
  Avatar,
  Select,
  Group,
} from '@mantine/core';
import { IconFileCv } from '@tabler/icons-react';

export function AddEmployeeModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add New Employee" size={'xl'}>
        <form>
          <Box p={20}>
            <Group gap={'sm'}>
              <Avatar src="avatar.png" alt="it's me" h={120} w={120} radius={'md'} mb={'md'} />
              <FileInput
                rightSection={<IconFileCv style={{ width: 18, height: 18 }} stroke={1.5} />}
                variant="filled"
                placeholder="Select Image"
                rightSectionPointerEvents="none"
                mb="xl"
                size="lg"
              />
            </Group>

            <Grid>
              <Grid.Col span={6}>
                <TextInput required variant="filled" label="Full Name" size="lg" mb="sm" />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  required
                  label="Food Category"
                  variant="filled"
                  data={['Fruits', 'Non-Veg', 'Veg', 'None']}
                  size="lg"
                  mb="sm"
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <Select
                  label="Department"
                  variant="filled"
                  data={['React', 'Angular', 'Vue', 'Svelte']}
                  size="lg"
                  mb="sm"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Role"
                  variant="filled"
                  data={['React', 'Angular', 'Vue', 'Svelte']}
                  size="lg"
                  mb="sm"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput variant="filled" label="Phone Number" size="lg" mb="sm" />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput label="Email Address" variant="filled" size="lg" mb="sm" />
              </Grid.Col>
            </Grid>
            <Group gap={'sm'}>
              <Button variant="default" size="lg" mt={'lg'}>
                Reset
              </Button>
              <Button size="lg" mt={'lg'}>
                Submit
              </Button>
            </Group>
          </Box>
        </form>
      </Modal>

      <Button onClick={open}>Add Employee</Button>
    </>
  );
}
