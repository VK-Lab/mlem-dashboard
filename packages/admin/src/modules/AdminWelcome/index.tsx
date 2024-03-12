import React from "react";

import {Img} from '@mlem-admin/components/Img';
import {Text} from '@mlem-admin/components/Text';

import Link from "next/link";
import Image from "next/image";
import CasperdashLogo from "~/public/img/casperdash-logo.webp";
import CasperWalletLogo from "~/public/img/casper-wallet.png";

import {
  CasperDashConnector,
  CasperWalletConnector,
  useAccount,
  useConnect,
} from '@casperdash/usewallet';
import { useOnLogin } from '@mlem-admin/hooks/useOnLogin';

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
        <div className="flex flex-col md:gap-10 gap-[583px] items-center justify-end w-full">
          <div className="h-[910px] md:h-[887px] md:px-5 relative w-full">
            <div className="absolute flex flex-col h-[887px] md:h-auto inset-x-[0] items-center justify-start mx-auto top-[0] w-auto md:w-full">
              <div className="relative w-[1440px] md:w-full">
                <div className="bg-indigo-900 flex flex-col items-center justify-start my-auto w-[56%]">
                  <Img
                    className="h-[887px] md:h-auto object-cover w-full"
                    src="/v2/images/banner_login.png"
                    alt="image"
                  />
                </div>
                <div className="absolute flex flex-col h-max inset-y-[0] items-center justify-start max-w-[792px] my-auto outline outline-[12px] outline-deep_purple-800_99 right-[3%] rounded w-full">
                  <div className="bg-indigo-900_cc flex flex-col items-center justify-start p-16 md:px-10 sm:px-5 rounded w-full">
                    <div className="flex flex-col gap-8 items-start justify-center w-[600px] md:w-full">
                      <div className="flex flex-col items-center justify-start w-auto">
                        <Img
                          className="h-[66px] md:h-auto object-cover w-[69px]"
                          src="/v2/images/img_logo1.png"
                          alt="logoOne"
                        />
                      </div>
                      <div className="flex flex-col gap-4 items-start justify-start w-full">
                        <div className="flex flex-col font-lexend items-start justify-start w-full">
                          <Text
                            className="leading-[64.00px] md:text-5xl text-[48px] text-blue_gray-50"
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
                          Connect your wallet to claim the exclusive benefits from Melem
                          <br />
                          To access the Beta Dashboard, please go to the{' '}
                          <Link className="acm-link-welcome"
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
                          className="bg-amber-500 flex flex-1 flex-row gap-2 items-center justify-start p-4 rounded w-full cursor-pointer">
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
                          className="bg-amber-500 flex flex-1 flex-row gap-2 items-center justify-start p-4 rounded w-full cursor-pointer">
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
