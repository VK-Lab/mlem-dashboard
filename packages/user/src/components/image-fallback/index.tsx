import { useEffect, useState } from "react";

import NFTEmptyImg from "@mlem-user/assets/images/nft-empty.png";
import { ImageProps } from "next/image";
import Image from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
  fallback?: ImageProps["src"];
  src?: string;
}

export const ImageWithFallback = ({
  fallback = NFTEmptyImg,
  alt,
  src,
  ...props
}: ImageWithFallbackProps) => {
  const [error, setError] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  const renderedSrc = error ? fallback : src;

  return (
    <Image
      alt={alt}
      onError={setError}
      src={renderedSrc as string}
      {...props}
    />
  );
};
