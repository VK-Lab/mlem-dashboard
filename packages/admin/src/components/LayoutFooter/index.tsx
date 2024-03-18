import React from 'react';

import { Img } from '@mlem-admin/components/Img';
import { Text } from '@mlem-admin/components/Text';
import Link from 'next/link';

type FooterProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'copyrighttext' | 'joincommunitytext'
> &
  Partial<{ copyrighttext: string; joincommunitytext: string }>;

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <>
      <div className="bg-indigo-900 flex flex-col font-bevietnampro gap-3 items-center justify-start py-24 w-full">
        <div className="flex flex-col items-start justify-between px-[174px] w-full md:px-10">
          <div className="flex flex-row gap-3 h-full items-start justify-between w-full md:flex-col md:items-center">
            <div className="flex flex-col gap-3 items-start justify-center w-auto md:items-center">
              <Img
                className="h-[66px] object-cover w-[69px] "
                src="/v2/images/img_logo1.png"
                alt="logo"
              />
              <Text
                className="text-blue_gray-50 text-sm w-auto md:hidden"
                size="txtBeVietnamProRegular14"
              >
                {props?.copyrighttext}
              </Text>
            </div>
            <div className="flex flex-col gap-3 items-center justify-center w-auto">
              <Text
                className="text-2xl text-center text-white-A700 w-auto md:text-xl"
                size="txtBeVietnamProSemiBold24"
              >
                {props?.joincommunitytext}
              </Text>
              <div className="flex flex-row gap-3 items-center justify-start w-auto">
                <Link
                  href="https://www.youtube.com/@casperdashofficialchannel5444"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Img
                    className="h-6 w-[33px]"
                    src="/v2/images/ic_youtube.svg"
                    alt="youtube"
                  />
                </Link>
                <Link
                  href="https://github.com/CasperDash"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Img
                    className="h-[27px] w-[27px]"
                    src="/v2/images/ic_github.svg"
                    alt="github"
                  />
                </Link>
                <Link
                  href="https://t.me/casperdash"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Img
                    className="h-[23px] w-7"
                    src="/v2/images/ic_tele.svg"
                    alt="telegram"
                  />
                </Link>
                <Link
                  href="https://twitter.com/casperdash_io"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Img
                    className="h-6 w-[31px]"
                    src="/v2/images/ic_twitter.svg"
                    alt="twitter"
                  />
                </Link>
              </div>
              <Text
                className="text-blue_gray-50 text-sm w-auto hidden md:block"
                size="txtBeVietnamProRegular14"
              >
                {props?.copyrighttext}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Footer.defaultProps = {
  copyrighttext: '© 2023 Casper Dash. All rights reserved.',
  joincommunitytext: 'Join our community',
};

export default Footer;
