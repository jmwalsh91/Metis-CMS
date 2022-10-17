import React, { Suspense } from 'react';
import { createStyles, Loader, Select, Text } from '@mantine/core';
import { getMetrics, Metrics } from '@/services/analytics';
import { useQuery } from '@tanstack/react-query';

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

type Props = {
site: string,
period: string}

export function DashStats({site, period}: Props ) {
  const { classes } = useStyles();
  const { data, error } = useQuery<Metrics, Error>(["metrics", site, period], () =>
    getMetrics(site, period)
  );

/* function handleSiteChange(e: React.ChangeEvent<HTMLSelectElement>) { */

  return (
    <div className={classes.root}>


    <div key="bounce" className={classes.stat}>
      <Suspense fallback={<Loader />}>
      <Text className={classes.count}>{data && data.bounce_rate.value}%</Text>
      <Text className={classes.title}>Bounce</Text>
  
    </Suspense>
    </div>

       <div key="pageviews" className={classes.stat}>
       <Suspense fallback={<Loader />}>
       <Text className={classes.count}>{data && data.pageviews.value}</Text>
       </Suspense>
       <Text className={classes.title}>Page Views.</Text>
{/*        <Text className={classes.description}>{stat.description}</Text> */}
     </div>

        <div key="duration" className={classes.stat}>
        <Suspense fallback={<Loader />}>
        <Text className={classes.count}>{data && data.visit_duration.value}</Text>
        </Suspense>
        <Text className={classes.title}>Duration</Text>
        <Text className={classes.description}>Average Duration</Text>
      </div>
         <div key="visitors" className={classes.stat}>
         <Suspense fallback={<Loader />}>
         <Text className={classes.count}>{data && data.visitors.value}</Text>
         </Suspense>
         <Text className={classes.title}>Visitors</Text>
{/*          <Text className={classes.description}></Text> */}
       </div>
    </div>
)
}
