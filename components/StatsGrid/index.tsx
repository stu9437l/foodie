import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons-react';
import classes from './StatsGrid.module.css';

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

export async function StatsGrid() {
  const res = await fetch('http://localhost:3000/api/v1/food/category');
  const { data: foodCategoryList } = await res.json();
  console.log({ foodCategoryList });

  // const data = [
  //   { title: 'Revenue', icon: 'receipt', value: '13,456', diff: 34 },
  //   { title: 'Profit', icon: 'coin', value: '4,145', diff: -13 },
  //   { title: 'Coupons usage', icon: 'discount', value: '745', diff: 18 },
  //   { title: 'New customers', icon: 'user', value: '188', diff: -30 },
  // ] as const;

  const stats = foodCategoryList.map((stat: any, index: number) => {
    const setICons = ['receipt', 'discount', 'receipt', 'receipt', 'receipt', 'receipt'];

    stat.icon = setICons[index];
    const Icon: any = icons[stat.icon];
    // const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    return (
      <Paper withBorder p="md" radius="md" key={stat.name}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.name}>
            {stat.name}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat._count?.employeeFood}</Text>
          <Text
            c={stat._count?.employeeFood > 0 ? 'teal' : 'red'}
            fz="sm"
            fw={500}
            className={classes.count}
          >
            <span>{stat.count}</span>
            {/* <countIcon size="1rem" stroke={1.5} /> */}
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return <SimpleGrid cols={{ base: 2, xs: 3, md: 6 }}>{stats}</SimpleGrid>;
}
