import type { JobicyApiResponse } from "@/lib/types";
import { JobBoard } from "@/components/job-board";
import { Hero } from "@/components/hero";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BASE_URL } from "@/lib/constants";

export async function getJobs(
  filters: Record<string, string>,
): Promise<JobicyApiResponse> {
  const params = new URLSearchParams(filters);

  return fetch(`${BASE_URL}/api/jobs?${params}`).then((res) => res.json());
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const params = await searchParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [
      "jobs",
      { industry: params.industry || null, jobGeo: params.jobGeo || null },
    ],
    queryFn: () => getJobs(params),
  });

  return (
    <main className="overflow-hidden">
      <div className="container px-4 lg:px-6 mx-auto py-16 lg:py-24 space-y-12 lg:space-y-14">
        <Hero
          heading="Remote IT Jobs Without Borders"
          buttonText="Discover jobs"
          src="/hero.jpg"
          desktopParagraph="Work on global IT projects from anywhere."
          mobileParagraph="Follow with one or two sentences that expand on your value
              proposition and focus on key benefits."
        />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <JobBoard />
        </HydrationBoundary>
      </div>
    </main>
  );
}
