export interface Metrics {
  page_views: {
    value: number;
  };
  unique_visitors: {
    value: number;
  };
  page_views_per_visitor: {
    value: number;
  };
  bounce_rate: {
    value: number;
  };
}
export interface MetricsResponse extends Response {
  results: Metrics;
}

export async function getMetrics(period: string) {
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
      console.error("Error:", error);
    });
    console.log(response)
  return response;
}
