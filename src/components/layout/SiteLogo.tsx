import { BrandLogo } from "@/components/branding/BrandLogo";

export interface SiteLogoProps {
  className?: string;
  variant?: "light-bg" | "dark-bg";
}

export function SiteLogo({
  className,
  variant = "light-bg",
}: SiteLogoProps) {
  return (
    <BrandLogo
      className={className}
      variant={variant === "dark-bg" ? "footer" : "navbar"}
    />
  );
}
