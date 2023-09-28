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
        "container mx-auto min-h-screen justify-between px-24 py-8",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
};
