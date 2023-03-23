import React from 'react';

import Link, { LinkProps } from 'next/link';

interface Props extends LinkProps {
  children: React.ReactNode;
}

const WrappedLink = ({ href, passHref = false, children }: Props) => {
  const style = {
    textDecoration: 'none',
    color: '#3c3c3c',
  };
  console.log('href: ', href);

  return (
    <Link passHref={passHref} href={href} style={style}>
      {children}
    </Link>
  );
};

export default WrappedLink;
