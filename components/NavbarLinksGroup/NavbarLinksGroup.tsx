'use client';
import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem, Button } from '@mantine/core';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import classes from './NavbarLinksGroup.module.css';
import { useParams, usePathname, useRouter } from 'next/navigation';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links }: LinksGroupProps) {
  const pathname = usePathname().toString().replace('/', '').toLowerCase();
  const activeRoute = pathname === label.toLowerCase();
  const { push } = useRouter();
  console.log({ pathname });

  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => {
        event.preventDefault();
        push(link.link);
      }}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={`${activeRoute ? classes.activeLink : ''} ${classes.control}`}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box
              ml="md"
              onClick={() => {
                hasLinks ? '' : push(label.toLowerCase());
              }}
            >
              {label}
            </Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse in={opened}>
          {label === 'Departments' && (
            <Button className={classes.buttonLink} variant="light">
              + New Department
            </Button>
          )}

          {items}
        </Collapse>
      ) : null}
    </>
  );
}

// const mockdata = {
//   label: 'Releases',
//   icon: IconCalendarStats,
//   links: [
//     { label: 'Upcoming releases', link: '/' },
//     { label: 'Previous releases', link: '/' },
//     { label: 'Releases schedule', link: '/' },
//   ],
// };

// export function NavbarLinksGroup() {
//   return (
//     <Box mih={220} p="md">
//       <LinksGroup {...mockdata} />
//     </Box>
//   );
// }
