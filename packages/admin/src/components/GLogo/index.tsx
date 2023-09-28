import Image from 'next/image';

import logoD2E from '~/public/img/logo--d2e--yellow.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GLogo = (props: any) => {
  return (
    <div
      {...props}
      className="d2e--logo"
      style={{ height: 64, textAlign: 'center', padding: '10px 0' }}
    >
      <Image alt="Melem" src={logoD2E} style={{ height: 'auto', width: 54 }} />
    </div>
  );
};

export default GLogo;
