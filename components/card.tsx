"use client";

import {
  Card as BaseCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardProfile,
  CardTitle,
} from "@/components/ui/card";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import type { Job } from "@/lib/types";
import { STORAGE_KEY } from "@/lib/constants";

function getAppliedJobs(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function toggleAppliedJob(slug: string): boolean {
  const jobs = getAppliedJobs();
  const index = jobs.indexOf(slug);
  if (index === -1) {
    jobs.push(slug);
  } else {
    jobs.splice(index, 1);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  return index === -1;
}

export const cardVariants = cva("gap-4", {
  variants: {
    variant: {
      default:
        "bg-neutral-50 [&_[data-slot=card-description]]:text-black [&_[data-slot=badge]]:text-neutral-800",
      highlighted:
        "text-white bg-linear-to-b from-[#008CFF] to-[#3605FB] [&>button]:bg-white [&>button]:text-black [&_[data-slot=company-name]]:text-white [&_[data-slot=card-description]]:text-white border-none",
      applied:
        "bg-emerald-50 border-emerald-300 [&_[data-slot=card-description]]:text-black [&_[data-slot=badge]]:text-neutral-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Card = ({
  className,
  job,
  badge,
}: React.ComponentProps<"div"> & {
  job: Job;
  badge?: "trending" | "recommended" | null;
}) => {
  const {
    companyLogo,
    companyName,
    jobExcerpt,
    jobIndustry,
    jobTitle,
    url,
    jobType,
    jobGeo,
    jobLevel,
    jobSlug,
  } = job;
  const alt = `${companyName} - Logo`;

  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setApplied(getAppliedJobs().includes(jobSlug));
  }, [jobSlug]);

  const handleToggleApplied = () => {
    const nowApplied = toggleAppliedJob(jobSlug);
    setApplied(nowApplied);
  };

  const variant = applied ? "applied" : badge ? "highlighted" : "default";

  return (
    <BaseCard className={`${cn(cardVariants({ variant, className }))}`}>
      <CardHeader className="gap-4">
        <div className="flex items-start">
          <CardProfile className="mr-auto" src={companyLogo} alt={alt} />
          <div className="flex items-center gap-2">
            {badge && !applied && (
              <Badge className="py-2 px-2 highlighted-badge">{badge}</Badge>
            )}
            <button
              type="button"
              onClick={handleToggleApplied}
              aria-label={applied ? "Mark as not applied" : "Mark as applied"}
              className={cn(
                "rounded-full p-0.5 transition-colors",
                applied
                  ? "text-emerald-600"
                  : "text-neutral-300 hover:text-neutral-500",
              )}
            >
              <CircleCheck className="size-6" />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <CardTitle>{jobTitle}</CardTitle>
          <h3
            data-slot="company-name"
            className="text-neutral-500 text-sm font-semibold"
          >
            {companyName}
          </h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 mb-auto">
        <div className="flex flex-wrap gap-1">
          {jobType.map((type) => (
            <Badge
              variant={
                variant === "default"
                  ? "default"
                  : variant === "highlighted"
                    ? "secondary"
                    : "outline"
              }
              key={type}
            >
              {type}
            </Badge>
          ))}
          <Badge
            variant={
              variant === "default"
                ? "default"
                : variant === "highlighted"
                  ? "secondary"
                  : "outline"
            }
          >
            {jobGeo}
          </Badge>
          <Badge
            variant={
              variant === "default"
                ? "default"
                : variant === "highlighted"
                  ? "secondary"
                  : "outline"
            }
          >
            {jobLevel}
          </Badge>
          {jobIndustry.map((industry) => (
            <Badge
              variant={
                variant === "default"
                  ? "default"
                  : variant === "highlighted"
                    ? "secondary"
                    : "outline"
              }
              key={industry}
            >
              {industry}
            </Badge>
          ))}
        </div>
        <CardDescription className="line-clamp-3">
          <p>{jobExcerpt}</p>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant={
            variant === "highlighted"
              ? "outline"
              : variant === "applied"
                ? "ghost"
                : "default"
          }
        >
          <Link href={url} className="w-full md:w-auto md:ml-auto">
            View Job
          </Link>
        </Button>
      </CardFooter>
    </BaseCard>
  );
};

export default Card;
