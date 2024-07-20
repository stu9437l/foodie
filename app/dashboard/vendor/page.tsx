'use client';
import {
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
  Box,
  Flex,
  Grid,
  Paper,
} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from '../../styles/ContactUs.module.css';
import { ContactIconsList } from '@/components/ContactIcon';

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

function ContactUs() {
  const icons = social.map((Icon, index) => (
    <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
      <Icon size="1.4rem" stroke={1.5} />
    </ActionIcon>
  ));

  return (
    <Box>
      <Grid align="start">
        <Grid.Col span={6}>
          <Title>Vendor Detail</Title>
          <Text mt="sm" mb={30}>
            Leave your email and we will get back to you within 24 hours
          </Text>
          <ContactIconsList />
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper p={30} shadow="sm">
            <Title order={4} mb={25}>
              Write Message
            </Title>
            {/* <Group mt="xl">{icons}</Group> */}
            <TextInput
              label="Email"
              required
              classNames={{ input: classes.input, label: classes.inputLabel }}
              size="lg"
              variant="filled"
            />
            <TextInput
              label="Subject"
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
              size="lg"
              variant="filled"
            />
            <Textarea
              required
              label="Your message"
              minRows={4}
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
              size="lg"
              variant="filled"
            />

            <Group justify="flex-end" mt="md">
              <Button
                mt={'lg'}
                className={classes.control}
                size="lg"
                loading={true}
                loaderProps={{ type: 'dots' }}
              >
                Send message
              </Button>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
export default ContactUs;
