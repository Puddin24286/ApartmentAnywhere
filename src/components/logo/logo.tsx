import React from "react";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "gradient" | "pulse";
  showSlogan?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className,
  size = "md",
  variant = "default",
  showSlogan = false,
  ...props
}) => {
  const sizeClasses = {
    sm: "h-10 w-auto",
    md: "h-14 w-auto",
    lg: "h-20 w-auto",
    xl: "h-28 w-auto"
  };

  const getWrapperClasses = () => {
    let classes = "flex items-center gap-3";
    if (variant === "gradient") classes += " logo-gradient";
    if (variant === "pulse") classes += " logo-pulse";
    return classes;
  };

  return (
    <div className={`${getWrapperClasses()} ${className ?? ""}`} {...props}>
      <div className="relative flex-shrink-0">
        <img
          src="/logo.png"
          alt="ApartmentAnywhere - Stay a While. Anywhere."
          className={sizeClasses[size]}
        />
      </div>

      {showSlogan && (
        <div className="hidden sm:flex flex-col">
          <span className="text-xs font-medium text-muted-foreground">
            Stay a While.
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Anywhere.
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
