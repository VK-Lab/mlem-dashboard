import React from 'react';

import { cn } from '@mlem-user/lib/utils';
import Link from 'next/link';

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/explore"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Explore
      </Link>
      <Link
        href="/my-nfts"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        My NFTs
      </Link>

      {/*<a*/}
      {/*  href="/examples/dashboard"*/}
      {/*  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"*/}
      {/*>*/}
      {/*  Ranking*/}
      {/*</a>*/}
      {/*<a*/}
      {/*  href="/examples/dashboard"*/}
      {/*  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"*/}
      {/*>*/}
      {/*  Wallets*/}
      {/*</a>*/}
      {/*<a*/}
      {/*  href="/examples/dashboard"*/}
      {/*  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"*/}
      {/*>*/}
      {/*  Club*/}
      {/*</a>*/}
    </nav>
  );
};
