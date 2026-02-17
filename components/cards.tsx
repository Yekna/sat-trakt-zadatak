"use client";

import { useCallback, useEffect, useState } from "react";
import Card from "./card";
import type { Job } from "@/lib/types";

const Cards = ({ jobs }: { jobs: Job[] }) => {
  const [indices, setIndices] = useState<[number, number] | null>(null);
  
  useEffect(() => {
    const i = Math.floor(Math.random() * jobs.length);
    let j = Math.floor(Math.random() * (jobs.length - 1));
    if (j >= i && jobs.length >= 2) j++;
    setIndices([i, j]);
  }, [jobs.length]);

  const isTrending = (idx: number) => (indices && idx === indices[0])
  const isRecommended = (idx: number) => (indices && idx === indices[1])

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {jobs.map((job, idx) => (
        <Card
          badge={isTrending(idx) ? 'trending' : isRecommended(idx) ? 'recommended' : null}
          job={job}
          key={`${job.companyName} - ${job.jobTitle}`}
        />
      ))}
    </div>
  );
};

export default Cards;
