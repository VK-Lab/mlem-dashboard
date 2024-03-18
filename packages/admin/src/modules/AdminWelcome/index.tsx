import React from 'react';

import {
  CasperDashConnector,
  CasperWalletConnector,
  useAccount,
  useConnect,
} from '@casperdash/usewallet';
import { Img } from '@mlem-admin/components/Img';
import LayoutFooter from '@mlem-admin/components/LayoutFooter';
import { Text } from '@mlem-admin/components/Text';
import { useOnLogin } from '@mlem-admin/hooks/useOnLogin';
import Image from 'next/image';
import Link from 'next/link';

import CasperWalletLogo from '~/public/img/casper-wallet.png';
import CasperdashLogo from '~/public/img/casperdash-logo.webp';

const Welcome = () => {
  const { publicKey } = useAccount({
    onConnect: async ({ publicKey }) => {
      if (publicKey) {
        await handleOnConnect(publicKey);
      }
    },
  });
  const { handleOnConnect } = useOnLogin();

  const processOnConnect = async () => {
    if (publicKey) {
      await handleOnConnect(publicKey);
    }
  };

  const { connectAsync: connectCasperDashAsync } = useConnect({
    connector: new CasperDashConnector(),
    onSuccess: processOnConnect,
  });
  const { connectAsync: connectCasperWalletAsync } = useConnect({
    connector: new CasperWalletConnector(),
    onSuccess: processOnConnect,
  });

  return (
    <>
      <div className="bg-black-900 flex flex-col font-bevietnampro items-center justify-end mx-auto w-full">
        <div className="flex flex-col items-center justify-end w-full md:h-full">
          <div className="h-[910px] relative w-full md:h-full sm:w-[100%]">
            <div className="absolute flex flex-col h-[887px] md:h-auto inset-x-[0] items-center justify-start mx-auto top-[0] w-auto md:w-full">
              <div className="relative w-[1440px] md:w-full">
                <div className="bg-indigo-900 flex flex-col items-center justify-start w-[56%] md:w-[180%] md:h-full sm:w-[100%] sm:h-[910px]">
                  <Img
                    className="h-[887px] object-cover w-full sm:h-[100%]"
                    src="/v2/images/banner_login.png"
                    alt="image"
                  />
                </div>
                <div
                  className="absolute flex flex-col h-max inset-y-[0] items-center justify-start max-w-[792px] my-auto outline outline-[12px] outline-deep_purple-800_99 right-[3%] rounded w-full
                md:right-0 md:left-0 md:outline-0 md:h-[80%]"
                >
                  <div className="bg-indigo-900_cc flex flex-col items-center justify-start p-16 rounded w-full md:w-auto md:bg-transparent md:p-0">
                    <div className="flex flex-col gap-3 items-start justify-center w-[600px] md:w-[80%]">
                      <div className="flex flex-col items-center justify-start w-auto">
                        <Img
                          className="h-[66px] md:h-auto object-cover w-[69px]"
                          src="/v2/images/img_logo1.png"
                          alt="logoOne"
                        />
                      </div>
                      <div className="flex flex-col gap-3 items-start justify-start w-full">
                        <div className="flex flex-col font-lexend items-start justify-start w-full">
                          <Text
                            className="leading-[64.00px] text-[48px] text-blue_gray-50 md:text-3xl "
                            size="txtLexendBold64"
                          >
                            <>
                              Welcome to Melem
                              <br />
                              Campaigner Dashboard
                            </>
                          </Text>
                        </div>
                        <Text
                          className="leading-[24.00px] max-w-[600px] md:max-w-full text-base text-blue_gray-50"
                          size="txtBeVietnamProSemiBold16"
                        >
                          Connect your wallet to claim the exclusive benefits
                          from Melem
                          <br />
                          To access the Beta Dashboard, please go to the{' '}
                          <Link
                            className="acm-link-welcome"
                            href=" https://t.me/melem_support_channel"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                          >
                            Melem Telegram Channel
                          </Link>{' '}
                          and request the beta account
                        </Text>
                      </div>
                      <div className="flex md:flex-col flex-row gap-3 items-start justify-start w-full">
                        <div
                          onClick={() => connectCasperDashAsync()}
                          className="bg-amber-500 flex flex-1 flex-row gap-3 items-center justify-start p-4 rounded w-full cursor-pointer"
                        >
                          <div className="bg-white-A700 h-10 rounded w-10">
                            <Image
                              alt="casperdash-logo"
                              src={CasperdashLogo}
                              style={{ height: 40, width: 40 }}
                            />
                          </div>
                          <Text
                            className="text-base text-black-900_01 text-center w-auto"
                            size="txtBeVietnamProSemiBold16Black90001"
                          >
                            Casperdash
                          </Text>
                        </div>
                        <div
                          onClick={() => connectCasperWalletAsync()}
                          className="bg-amber-500 flex flex-1 flex-row gap-3 items-center justify-start p-4 rounded w-full cursor-pointer"
                        >
                          <div className="bg-white-A700 h-10 rounded w-10">
                            <Image
                              alt="casper-wallet-logo"
                              src={CasperWalletLogo}
                              style={{ height: 40, width: 40 }}
                            />
                          </div>
                          <Text
                            className="text-base text-black-900_01 text-center w-auto"
                            size="txtBeVietnamProSemiBold16Black90001"
                          >
                            Casper Wallet
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
