import { ReactNode } from "react";

import { cn } from "@mlem-user/lib/utils";

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

export const BaseContainer = ({
  children,
  className,
  ...props
}: ContainerProps) => {
  return (
    <main
      className={cn(
        "container mx-auto min-h-screen justify-between mb-10",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
};
