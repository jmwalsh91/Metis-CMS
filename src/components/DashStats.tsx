import React from 'react';
import { createStyles, Text } from '@mantine/core';
import { Metrics } from '@/services/analytics';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    padding: theme.spacing.xl * 1.5,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  title: {
    color: theme.white,
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },

  count: {
    color: theme.white,
    fontSize: 32,
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.sm,
    marginTop: 5,
  },

  stat: {
    flex: 1,

    '& + &': {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `1px solid ${theme.colors[theme.primaryColor][3]}`,

      [theme.fn.smallerThan('sm')]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `1px solid ${theme.colors[theme.primaryColor][3]}`,
      },
    },
  },
}));

interface StatsGroupProps {
  data: Metrics
}

export function DashStats({ data }: StatsGroupProps) {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
    <div key="bounce" className={classes.stat}>
      <Text className={classes.count}>{data.bounce_rate.value}</Text>
      <Text className={classes.title}>Bounce</Text>
  
    </div>
       <div key="pageviews" className={classes.stat}>
       <Text className={classes.count}>{data.pageviews.value}</Text>
       <Text className={classes.title}>Page Views.</Text>
{/*        <Text className={classes.description}>{stat.description}</Text> */}
     </div>
        <div key="duration" className={classes.stat}>
        <Text className={classes.count}>{data.visit_duration.value}</Text>
        <Text className={classes.title}>Duration</Text>
        <Text className={classes.description}>Average Duration</Text>
      </div>
         <div key="visitors" className={classes.stat}>
         <Text className={classes.count}>{data.visitors.value}</Text>
         <Text className={classes.title}>Visitors</Text>
{/*          <Text className={classes.description}></Text> */}
       </div>
    </div>
)
}
