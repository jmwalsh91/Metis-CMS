import { AppShell, Navbar, Header, ScrollArea, Text, Title } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React, { ReactNode, useContext } from 'react';
import { AuthContext } from '../services/AuthRequired';
import NavItems from './NavItems';
type Props = {
    children: ReactNode
}

export default function Shell({children}: Props ) {
const authUser = useContext(AuthContext)
  return (
    <AppShell
    fixed={false}

      
      header={<Header height="4rem" style={{display: 'flex', flexDirection: 'row'}} p="xs"><Title order={2} pb="1rem">
        BlogCMS 
        </Title>
      {authUser.user? <NavItems/> : <Text>Please sign in</Text>}</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <NotificationsProvider position="top-center">
      <ScrollArea>
      {children}
      </ScrollArea>
      </NotificationsProvider>
    </AppShell>
  );
}