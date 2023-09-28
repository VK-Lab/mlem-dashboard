import { MiddleTruncatedText } from "@mlem-user/components/truncated-text";
import { cn } from "@mlem-user/lib/utils";

export type TokenAttributeProps = {
  name?: string;
  value?: string;
  className?: string;
};

export const TokenAttribute = ({
  name,
  value,
  className,
}: TokenAttributeProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="text-xs text-gray-400">{name}</div>
      <MiddleTruncatedText className="mt-1 text-sm text-gray-800 details line-clamp-2 max-w-[200px]">
        {value}
      </MiddleTruncatedText>
    </div>
  );
};
