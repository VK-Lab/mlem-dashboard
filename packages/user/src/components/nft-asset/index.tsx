import { isVideoURL } from "@mlem-user/lib/type-checker";
import { cn } from "@mlem-user/lib/utils";

import { ImageWithFallback } from "../image-fallback";

type NFTAssetProps = {
  className?: string;
  url?: string;
};

export const NFTAsset = ({ url, className }: NFTAssetProps) => {
  return (
    <div className={cn("relative", className)}>
      {isVideoURL(url) ? (
        <video
          autoPlay
          className="absolute h-full w-full rounded-lg object-fill"
        >
          <source src={url} type="video/mp4" />
        </video>
      ) : (
        <ImageWithFallback
          src={url}
          alt="image"
          className="w-full h-full rounded-lg"
          fill={true}
          loading="lazy"
          objectFit="contain"
        />
      )}
    </div>
  );
};
