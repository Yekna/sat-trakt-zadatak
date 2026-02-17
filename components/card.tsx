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
import type { Job } from "@/lib/types";

export const cardVariants = cva("gap-4", {
  variants: {
    variant: {
      default:
        "bg-neutral-50 [&_[data-slot=card-description]]:text-black [&_[data-slot=badge]]:text-neutral-800",
      highlighted:
        "text-white bg-linear-to-b from-[#008CFF] to-[#3605FB] [&>button]:bg-white [&>button]:text-black [&_[data-slot=company-name]]:text-white [&_[data-slot=card-description]]:text-white border-none",
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
  } = job;
  const alt = `${companyName} - Logo`;
  const variant = badge ? "highlighted" : "default";
  const buttonVariant = variant === "default" ? "default" : "secondary";

  return (
    <BaseCard className={`${cn(cardVariants({ variant, className }))}`}>
      <CardHeader className="gap-4">
        <div className="flex items-start">
          <CardProfile className="mr-auto" src={companyLogo} alt={alt} />
          {badge && (
            <Badge className="py-2 px-2 highlighted-badge">{badge}</Badge>
          )}
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
              variant={buttonVariant}
              key={type}
            >
              {type}
            </Badge>
          ))}
          <Badge variant={buttonVariant}>
            {jobGeo}
          </Badge>
          <Badge variant={buttonVariant}>
            {jobLevel}
          </Badge>
          {jobIndustry.map((industry) => (
            <Badge
              variant={buttonVariant}
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
        <Button asChild variant={variant === "default" ? "default" : "outline"}>
          <Link href={url} className="w-full md:w-auto md:ml-auto">
            View Job
          </Link>
        </Button>
      </CardFooter>
    </BaseCard>
  );
};

export default Card;
