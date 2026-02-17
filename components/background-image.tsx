import Image from "next/image";

export default function GradientBackroundImage({
  className,
}: {
  className?: string;
}) {
  return (
    <Image
      src={"/background.png"}
      alt={"Background Image"}
      className={`-left-94 -z-10 pointer-events-none max-w-none absolute ${className}`}
      width={1440}
      height={960}
    />
  );
}
