interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-base text-muted">{description}</p>
      )}
    </div>
  );
}
