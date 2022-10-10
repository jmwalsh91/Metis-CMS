import { QueryFunctionContext } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

export interface Metrics {
  visitors: {
    value: number;
  };
  pageviews: {
    value: number;
  };
  bounce_rate: {
    value: number;
  };
  visit_duration: {
    value: number;
  };
}
export interface MetricsResponse extends Response {
  results: Metrics;
}

export async function getMetrics(period: string): Promise<Metrics> {
  const response = await fetch(
    `https://plausible.io/api/v1/stats/aggregate?site_id=${
      import.meta.env.VITE_SITE_1
    }&period=${period}&metrics=visitors,pageviews,bounce_rate,visit_duration`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PLAUSIBLE_API_KEY}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data: MetricsResponse) => {
      return data.results;
    })
    .catch((error) => {
      throw new Error(error);
    });
  console.log(response);
  return response && response;
}
