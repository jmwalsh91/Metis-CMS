import { Container, Drawer, Group, Stack, Text } from '@mantine/core'
import React from 'react'
import NavItems from './NavItems'

type Props = {
 opened: boolean,
 setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

function XsNav({opened, setOpened}: Props) {
  return (
    <>
    <Drawer
    aria-label="Navigation Dialog"
    closeButtonLabel="Close Dialog"
    opened={opened}
    onClose={() => setOpened(false)}
    title="Navigation"
    padding="xl"
    size="xs"
  >
    <Stack justify="space-around" sx={{
        height: "100vh"
    }}>
 
<Container>
   <NavItems /* orientation="vertical" */ />
</Container>
 
    <Container>
        hello
    </Container>
        </Stack>
  </Drawer>
  <Group position="center">
  </Group>
</>
  )
}

export default XsNav