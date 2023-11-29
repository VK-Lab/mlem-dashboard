"use client";

import {
  CasperDashConnector,
  CasperWalletConnector,
  useConnect,
} from "@casperdash/usewallet";
import Image from "next/image";

import CasperWalletLogo from "@mlem-user/assets/images/casper-wallet.png";
import CasperDashLogo from "@mlem-user/assets/images/casperdash-logo.webp";
import { Button } from "@mlem-user/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@mlem-user/components/ui/dialog";

type Props = {
  className?: string;
  buttonText?: string;
};

export const ButtonConnect = ({ className, buttonText = "Connect" }: Props) => {
  const { connectAsync: connectCasperDashAsync } = useConnect({
    connector: new CasperDashConnector(),
  });
  const { connectAsync: connectCasperWalletAsync } = useConnect({
    connector: new CasperWalletConnector(),
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button className={className}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-4">
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription className="flex justify-center flex-col align-center gap-4">
            <Button className="w-full h-12" onClick={connectCasperDashAsync}>
              <div className="flex items-center">
                <div>
                  <Image
                    alt="casperdash logo"
                    src={CasperDashLogo}
                    width={30}
                    height={30}
                  />
                </div>
                <div className="text-md">CasperDash</div>
              </div>
            </Button>
            <Button className="w-full h-12" onClick={connectCasperWalletAsync}>
              <div className="flex items-center">
                <div>
                  <Image
                    alt="casper wallet logo"
                    src={CasperWalletLogo}
                    width={18}
                    height={18}
                  />
                </div>
                <div className="text-md ml-2">Casper Wallet</div>
              </div>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
