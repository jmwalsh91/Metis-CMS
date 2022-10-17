import { getMetrics, Metrics } from "@/services/analytics";
import { queryClient } from "@/services/queryClient";
import {
  Button,
  Card,
  CardSection,
  Grid,
  Group,
  Header,
  Loader,
  Paper,
  Select,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, Suspense } from "react";
import { DashStats } from "../components/analytics/DashStats";

type Props = {};
const statsData = [
  {
    title: "Unique Views",
    stats: "1000",
    description: "This is how many unique views, congrats!",
  },
  {
    title: "Posts this week",
    stats: "7",
    description: "Up 700% from last week!",
  },
  {
    title: "Another Metric",
    stats: "Number",
    description: "Another Metric Description would go here.",
  },
];
function Dashboard({}: Props) {
  const theme = useMantineTheme();
  const [site, setSite] = React.useState<string>('jmwalsh.dev'!);
  const [period, setPeriod] = React.useState<string>('day'!);

function handleUpdate(updateFn: (Dispatch<SetStateAction<string>>), value: string) {
  updateFn(value);
  queryClient.invalidateQueries(['metrics', site, period])
}

  return (
    <Paper
      style={{
        margin: "0 auto",
        display: "flex",
        justifySelf: "center",
        justifyContent: "start",
        flexDirection: "column",
      }}
    >
      <Group position="apart" mb={"lg"} sx={{
        padding: "1rem",
        border: `3px solid ${theme.colors.primary[3]}`
      }}>
        <Title>Dashboard</Title>
      <Select
      label="Site"
      defaultValue={'jmwalsh.dev'}
      width={200}
      data={[
        { value: 'jmwalsh.dev', label: 'Portfolio' },
        { value: 'cryptones.vercel.app', label: 'crypTones' },
      ]}
      onChange={(value) => handleUpdate(setSite, value!)}
      />
      <Select
      label="Time period"
      defaultValue={'day'}
      width={200}
      data={[
        { value: 'day', label: 'Today' },
        { value: '7d', label: '7 days' },
        { value: '30d', label: '30 days' },
        { value: 'month', label: 'Current Month' },
      ]}
      onChange={(value) => handleUpdate(setPeriod, value!)}
      />
   
      </Group>

      <Suspense fallback={<Loader />}>
        { <DashStats site={site} period={period} />}
      </Suspense>

      <Paper p={".5rem"}>
        <Text
          size="xl"
          component="h1"
          align={"center"}
          style={{
            fontSize: "2rem",
          }}
        >
          {" "}
          Recent Posts
        </Text>
      </Paper>
      <Card
        style={{
          width: "25rem",
          height: "20rem",
        }}
      >
        <Title order={3} p="1rem">
          This is a recent Post
        </Title>
        <CardSection>This is a recent post</CardSection>
        <Button>Expand</Button>
      </Card>
    </Paper>
  );
}

export default Dashboard;
