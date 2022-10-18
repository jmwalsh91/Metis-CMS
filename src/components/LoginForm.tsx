import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    Loader,
    useMantineTheme,
  } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { UserCredentials } from '@supabase/supabase-js';
import { Dispatch, SetStateAction, useState, useTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sbClient } from '../services/sb';
import { theme } from '../styles/theme';
/**
 * Types and Interfaces
 */
interface LoginValues {
    email: string
    password: string
}
type Props = {
  setRegisterPage: Dispatch<SetStateAction<boolean>>
}
const useStyles = createStyles((theme) => ({
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  
    logo: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      width: 120,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));
/**
 * 
 * @function LoginForm
 * Form for login with supabase auth (email strategy)
 * @returns form for user login
 */
export default function LoginForm() {
const [checking, setChecking] = useState<boolean>(false)
  const navigate = useNavigate()
  const theme = useMantineTheme()
  const classes = useStyles()
    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          },
    })
    async function handleSubmit (values: LoginValues) {
      setChecking(true)
      console.log(values.email, values.password)

        const data = await sbClient.auth.signIn(values as UserCredentials)
        if (data.error !== null) {
            console.log(data.error)
            showNotification({
              title: "Suspicious...",
              message: "Those are not the credentials you're looking for",
              color: "warning"
            })
            setChecking(false)
        }
        if (data.user && data.session) {
          setChecking(false)
          showNotification({
            title: "Rad!",
            message: "We're in!",
            color: "success"
          })
          navigate('/dash')
        }
      } 


    return (
        <>
        <Title order={2} align="center" mt="md" mb={50}>
        Welcome back to BlogCMS
      </Title>
       
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput 
      label="Email address"
      placeholder="hello@gmail.com" 
      disabled={checking}
      size="md"
      required
      {...form.getInputProps('email')} />
      <PasswordInput label="Password" placeholder="Your password" mt="md" size="md"
      required
      disabled={checking}
      {...form.getInputProps('password')} />
      
      <Button type="submit" fullWidth mt="xl" size="md">
        {checking? <Loader variant="bars" color={theme.colors.accent[1]}/> : "Login" } 
      </Button>
    </form>


   <Link to="/dash">Dash</Link>
      <Text align="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor component={Link} to="/register" weight={700}>
            Register
          </Anchor>
        </Text>
        
      </>
    )
  }

