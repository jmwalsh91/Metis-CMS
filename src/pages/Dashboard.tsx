import { getMetrics, Metrics } from "@/services/analytics";
import {
  Button,
  Card,
  CardSection,
  Grid,
  Header,
  Loader,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { DashStats } from "../components/DashStats";

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
  const { data, error } = useQuery<Metrics, Error>(["metrics"], () =>
    getMetrics("6mo")
  );
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
      <Suspense fallback={<Loader />}>
        {data && <DashStats data={data} />}
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
