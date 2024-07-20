'use client';
import { useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Avatar,
  Button,
  Box,
  RadioGroup,
  Radio,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from '../../styles/TableSort.module.css';
import { FoodCategory } from '@/components/FoodCategory';
import { AddEmployeeModal } from '@/components/Modal/AddEmployee';

interface RowData {
  id: string;
  avatar: string;
  name: string;
  department: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  foodCategory: string;
}

interface ThProps {
  children?: React.ReactNode;
  reversed?: boolean;
  sorted?: boolean;
  onSort?: (value: any) => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          {children === 'Food Category' || children === 'Action' ? (
            ''
          ) : (
            <Center className={classes.icon}>
              <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </Center>
          )}
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

const data = [
  {
    name: 'Athena Weissnat',
    company: 'Little - Rippin',
    email: 'Elouise.Prohaska@yahoo.com',
  },
  {
    name: 'Deangelo Runolfsson',
    company: 'Greenfelder - Krajcik',
    email: 'Kadin_Trantow87@yahoo.com',
  },
  {
    name: 'Danny Carter',
    company: 'Kohler and Sons',
    email: 'Marina3@hotmail.com',
  },
  {
    name: 'Trace Tremblay PhD',
    company: 'Crona, Aufderhar and Senger',
    email: 'Antonina.Pouros@yahoo.com',
  },
  {
    name: 'Derek Dibbert',
    company: 'Gottlieb LLC',
    email: 'Abagail29@hotmail.com',
  },
  {
    name: 'Viola Bernhard',
    company: 'Funk, Rohan and Kreiger',
    email: 'Jamie23@hotmail.com',
  },
  {
    name: 'Austin Jacobi',
    company: 'Botsford - Corwin',
    email: 'Genesis42@yahoo.com',
  },
  {
    name: 'Hershel Mosciski',
    company: 'Okuneva, Farrell and Kilback',
    email: 'Idella.Stehr28@yahoo.com',
  },
  {
    name: 'Mylene Ebert',
    company: 'Kirlin and Sons',
    email: 'Hildegard17@hotmail.com',
  },
  {
    name: 'Lou Trantow',
    company: 'Parisian - Lemke',
    email: 'Hillard.Barrows1@hotmail.com',
  },
];

const dummyData = [
  {
    id: '1',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    name: 'Robert Wolfkisser',
    department: 'HR',
    email: 'rob_wolf@gmail.com',
    phone: '9800123456',
    role: 'Manager',
    address: 'Nepal',
    foodCategory: 'fruits',
  },
  {
    id: '2',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Alice Green',
    department: 'Marketing',
    email: 'alice.green@gmail.com',
    phone: '9800246891',
    role: 'Coordinator',
    address: 'USA',
    foodCategory: 'vegetarian',
  },
  {
    id: '3',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'John Doe',
    department: 'IT',
    email: 'john.doe@gmail.com',
    phone: '9800374892',
    role: 'Developer',
    address: 'Canada',
    foodCategory: 'non-veg',
  },
  {
    id: '4',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png',
    name: 'Emily Brown',
    department: 'Finance',
    email: 'emily.brown@gmail.com',
    phone: '9800456713',
    role: 'Accountant',
    address: 'Australia',
    foodCategory: 'fruits',
  },
  {
    id: '5',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
    name: 'Michael Johnson',
    department: 'Operations',
    email: 'michael.johnson@gmail.com',
    phone: '9800598724',
    role: 'Manager',
    address: 'UK',
    foodCategory: 'fruits',
  },
  {
    id: '6',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png',
    name: 'Sophia Lee',
    department: 'HR',
    email: 'sophia.lee@gmail.com',
    phone: '9800683745',
    role: 'HR Specialist',
    address: 'Germany',
    foodCategory: 'vegetarian',
  },
  {
    id: '7',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    name: 'Daniel Miller',
    department: 'Marketing',
    email: 'daniel.miller@gmail.com',
    phone: '9800759861',
    role: 'Marketing Analyst',
    address: 'France',
    foodCategory: 'non-veg',
  },
  {
    id: '8',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png',
    name: 'Olivia Wilson',
    department: 'IT',
    email: 'olivia.wilson@gmail.com',
    phone: '9800897321',
    role: 'System Administrator',
    address: 'Brazil',
    foodCategory: 'vegetarian',
  },
  {
    id: '9',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png',
    name: 'David Martinez',
    department: 'Finance',
    email: 'david.martinez@gmail.com',
    phone: '9800914578',
    role: 'Financial Analyst',
    address: 'Spain',
    foodCategory: 'fruits',
  },
  {
    id: '10',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
    name: 'Emma Thomas',
    department: 'Operations',
    email: 'emma.thomas@gmail.com',
    phone: '9801062453',
    role: 'Operations Manager',
    address: 'Italy',
    foodCategory: 'vegetarian',
  },
  {
    id: '11',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-11.png',
    name: 'James Garcia',
    department: 'HR',
    email: 'james.garcia@gmail.com',
    phone: '9801123789',
    role: 'HR Coordinator',
    address: 'Mexico',
    foodCategory: 'non-veg',
  },
  {
    id: '12',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-12.png',
    name: 'Ava Moore',
    department: 'Marketing',
    email: 'ava.moore@gmail.com',
    phone: '9801278941',
    role: 'Marketing Specialist',
    address: 'India',
    foodCategory: 'fruits',
  },
  {
    id: '13',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-13.png',
    name: 'William Clark',
    department: 'IT',
    email: 'william.clark@gmail.com',
    phone: '9801376592',
    role: 'Software Engineer',
    address: 'New Zealand',
    foodCategory: 'non-veg',
  },
  {
    id: '14',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-14.png',
    name: 'Sophie Turner',
    department: 'Finance',
    email: 'sophie.turner@gmail.com',
    phone: '9801423765',
    role: 'Financial Advisor',
    address: 'South Africa',
    foodCategory: 'vegetarian',
  },
  {
    id: '15',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-15.png',
    name: 'Lucas Walker',
    department: 'Operations',
    email: 'lucas.walker@gmail.com',
    phone: '9801579341',
    role: 'Operations Analyst',
    address: 'Argentina',
    foodCategory: 'fruits',
  },
  {
    id: '16',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-16.png',
    name: 'Ella Baker',
    department: 'HR',
    email: 'ella.baker@gmail.com',
    phone: '9801687459',
    role: 'HR Assistant',
    address: 'Sweden',
    foodCategory: 'vegetarian',
  },
  {
    id: '17',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-17.png',
    name: 'Alexander Wood',
    department: 'Marketing',
    email: 'alexander.wood@gmail.com',
    phone: '9801759864',
    role: 'Marketing Manager',
    address: 'Norway',
    foodCategory: 'non-veg',
  },
  {
    id: '18',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-18.png',
    name: 'Isabella White',
    department: 'IT',
    email: 'isabella.white@gmail.com',
    phone: '9801897432',
    role: 'IT Specialist',
    address: 'Switzerland',
    foodCategory: 'fruits',
  },
  {
    id: '19',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-19.png',
    name: 'Matthew Lopez',
    department: 'Finance',
    email: 'matthew.lopez@gmail.com',
    phone: '9801914578',
    role: 'Financial Consultant',
    address: 'Portugal',
    foodCategory: 'vegetarian',
  },
  {
    id: '20',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-20.png',
    name: 'Grace Hill',
    department: 'Operations',
    email: 'grace.hill@gmail.com',
    phone: '9802062453',
    role: 'Operations Coordinator',
    address: 'Greece',
    foodCategory: 'non-veg',
  },
];

function TableSort() {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(dummyData);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(dummyData, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(dummyData, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={32} src={row.avatar} radius={26} />
          <Text size="sm" fw={500}>
            {row.name}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>{row.role}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.phone}</Table.Td>
      <Table.Td>{row.address}</Table.Td>
      <Table.Td fw={500}>
        {row.foodCategory.toString().charAt(0).toUpperCase() + row.foodCategory.slice(1)}
      </Table.Td>
      <Table.Td>
        <Button>Action</Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Group justify="space-between" mb={25}>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <AddEmployeeModal />
      </Group>
      {/* <ScrollArea h={400}> */}
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'role'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('role')}
            >
              Address
            </Th>
            <Th
              sorted={sortBy === 'role'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('role')}
            >
              Email
            </Th>

            <Th
              sorted={sortBy === 'phone'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('phone')}
            >
              Phone
            </Th>
            <Th
              sorted={sortBy === 'address'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('address')}
            >
              Address
            </Th>
            <Th>Food Category</Th>
            <Th>Action</Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      {/* </ScrollArea> */}
    </>
  );
}
export default TableSort;
