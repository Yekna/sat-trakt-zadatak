"use client";

import { useQuery } from "@tanstack/react-query";
import { parseAsString, useQueryStates } from "nuqs";
import Cards from "./cards";
import CardsSkeleton from "./cards-skeleton";
import type { JobicyApiResponse } from "@/lib/types";
import { Button } from "./ui/button";
import { useMemo } from "react";
import GradientBackroundImage from "./background-image";
import { Filter } from "./filter";
import { BASE_URL, INDUSTRIES, LOCATIONS } from "@/lib/constants";
import { decode } from "html-entities";

async function fetchJobs(filters: {
  industry: string | null;
  jobGeo: string | null;
}): Promise<JobicyApiResponse> {
  const params = new URLSearchParams();

  if (filters.industry) params.set("industry", filters.industry);
  if (filters.jobGeo) params.set("jobGeo", filters.jobGeo);

  return fetch(`${BASE_URL}/api/jobs?${params}`).then((res) => res.json());
}

export function JobBoard() {
  const [filters, setFilters] = useQueryStates({
    industry: parseAsString,
    jobGeo: parseAsString,
  });

  const { industry, jobGeo } = filters;
  const hasFilters = !!industry || !!jobGeo;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["jobs", { industry, jobGeo }],
    queryFn: () => fetchJobs({ industry, jobGeo }),
  });

  const jobs = useMemo(
    () =>
      data?.jobs?.map((job) => ({
        ...job,
        companyName: decode(decode(job.companyName)),
        jobExcerpt: decode(decode(job.jobExcerpt)),
        jobIndustry: job.jobIndustry.map((i) => decode(decode(i))),
        jobTitle: decode(decode(job.jobTitle)),
      })),
    [data],
  );

  return (
    <div className="space-y-6" id="jobFilter">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
        <Filter
          emptyPlaceholder="No location found"
          id="location-filter"
          items={LOCATIONS}
          label="Company location:"
          placeholder="Worldwide"
          onValueChange={(jobGeo) => setFilters({ jobGeo })}
          value={jobGeo}
        />
        <Filter
          emptyPlaceholder="No industries found"
          id="industry-filter"
          items={INDUSTRIES}
          label="Industries:"
          placeholder="All industries"
          onValueChange={(industry) => setFilters({ industry })}
          value={industry}
        />
        {hasFilters && (
          <Button
            className="mr-auto md:mr-0 ml-auto"
            variant="ghost"
            onClick={() => setFilters(null)}
          >
            Reset filters
          </Button>
        )}
      </div>
      {isLoading ? (
        <CardsSkeleton />
      ) : isError ? (
        <Button onClick={() => refetch()}>Try again.</Button>
      ) : jobs?.length ? (
        <div className="relative">
          {jobs.length > 6 && (
            <GradientBackroundImage className={`md:hidden top-0`} />
          )}
          <Cards jobs={jobs} />
          <GradientBackroundImage
            className={`-bottom-16 lg:-bottom-24 md:left-1/2 md:-translate-x-1/2 ${
              jobs.length > 8
                ? "block"
                : jobs.length > 6
                  ? "block lg:hidden"
                  : jobs.length > 4
                    ? "block md:hidden"
                    : jobs.length > 2
                      ? "block sm:hidden"
                      : "hidden"
            }`}
          />
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-12">
          {data?.message || data?.error}
        </p>
      )}
    </div>
  );
}
