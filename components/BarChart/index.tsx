import { BarChart } from '@mantine/charts';
import { data } from './data';
import { Box, Group, Title } from '@mantine/core';
import classes from './BarChart.module.css';

export function BarDiagram() {
  return (
    <Group p={20} className={classes.barchartWrapper} mt={25}>
      <Title order={3} mb={25}>
        Foodie According to Department
      </Title>
      <BarChart
        h={350}
        data={data}
        dataKey="department"
        series={[
          { name: 'Fruits', color: 'violet.6' },
          { name: 'NonVeg', color: 'blue.6' },
          { name: 'Veg', color: 'teal.6' },
        ]}
        tickLine="y"
      />
    </Group>
  );
}
