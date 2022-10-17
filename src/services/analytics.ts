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

export async function getMetrics(siteId: string | null, period: string | null): Promise<Metrics> {

  if (!siteId || !period) {
    return Promise.reject("Missing siteId or period");
  }

  const response = await fetch(
    `https://plausible.io/api/v1/stats/aggregate?site_id=${
      siteId
    }&period=${period}&metrics=visitors,pageviews,bounce_rate,visit_duration`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ANALYTICS_KEY}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data: MetricsResponse) => {
        console.log("data", data)
      return data.results;
    })
    .catch((error) => {
      throw new Error(error);
    });
  console.log(response);
  return response && response;
  
}
