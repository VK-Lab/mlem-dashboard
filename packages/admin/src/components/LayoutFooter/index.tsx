import React from "react";

import {Img} from '@mlem-admin/components/Img';
import {Text} from '@mlem-admin/components/Text';
import Link from "next/link";

type FooterProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "copyrighttext" | "joincommunitytext"
> &
  Partial<{ copyrighttext: string; joincommunitytext: string }>;

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <>
      <div className="bg-indigo-900 flex flex-col font-bevietnampro gap-3 items-center justify-start max-w-[1440px] py-24 w-full">
        <div className="flex flex-col items-start justify-between md:px-10 sm:px-5 px-[174px] w-full">
          <div className="flex sm:flex-col flex-row gap-3 h-full items-start justify-between w-full">
            <div className="flex flex-col gap-3 items-start justify-center w-auto">
              <Img
                className="h-[66px] md:h-auto object-cover w-[69px] sm:w-full"
                src="/v2/images/img_logo1.png"
                alt="logoOne_One"
              />
              <Text
                className="text-blue_gray-50 text-sm w-auto"
                size="txtBeVietnamProRegular14"
              >
                {props?.copyrighttext}
              </Text>
            </div>
            <div className="flex flex-col gap-3 items-center justify-center w-auto">
              <Text
                className="text-2xl md:text-[22px] text-center text-white-A700 sm:text-xl w-auto"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Footer.defaultProps = {
  copyrighttext: "© 2023 Casper Dash. All rights reserved.",
  joincommunitytext: "Join our community",
};

export default Footer;
