import { cn } from "@mlem-user/utils";
import { Loader2 } from "lucide-react";

type Props = {
  className?: string;
};

export const SpinLoader = ({ className }: Props) => {
  return <Loader2 className={cn("animate-spin", className)} />;
};
