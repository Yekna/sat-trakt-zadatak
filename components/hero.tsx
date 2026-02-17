import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Tagline } from "@/components/ui/tagline";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Props = {
  heading: string;
  buttonText: string;
  mobileParagraph: string;
  desktopParagraph: string;
  src: string;
};

export function Hero({
  heading,
  buttonText,
  mobileParagraph,
  desktopParagraph,
  src,
}: Props) {
  return (
    <section aria-labelledby="hero-heading">
      <div className="mx-auto flex flex-col">
        <Tagline asChild className="mb-5 lg:mb-6 mx-auto lg:mx-0">
          <Badge variant="outline">
            <span className="size-1.5 rounded-full bg-green-500" />
            <a href="#" className="text-blue-600 font-semibold">
              Remote jobs
            </a>
            <span>·</span>
            <span className="text-muted-foreground">200+ new jobs today</span>
          </Badge>
        </Tagline>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16 text-center lg:text-left">
          <h1
            id="hero-heading"
            className="heading-xl lg:max-w-xl mb-5 lg:mb-0 text-blue-700"
          >
            {heading}
          </h1>

          <div className="flex flex-col items-center lg:items-start lg:max-w-md flex-1">
            <p className="text-muted-foreground text-lg block lg:hidden mb-8">
              {mobileParagraph}
            </p>
            <p className="text-muted-foreground text-lg hidden lg:block mb-6">
              {desktopParagraph}
            </p>
            <Button asChild>
              <Link href="#jobFilter">
                {buttonText}
                <ArrowDown className="hidden lg:block" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="w-full">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={src}
              alt="Hero section visual"
              priority
              className="rounded-xl object-cover"
              sizes="(max-width: 1488px) 100vw, 1488px"
              fill
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
}
