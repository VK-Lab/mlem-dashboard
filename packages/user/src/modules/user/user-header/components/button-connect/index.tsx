"use client";

import {
  CasperDashConnector,
  CasperWalletConnector,
  useConnect,
} from "@casperdash/usewallet";
import { Button } from "@mlem-user/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@mlem-user/components/ui/dialog";

export const ButtonConnect = () => {
  const { connectAsync: connectCasperDashAsync } = useConnect({
    connector: new CasperDashConnector(),
  });
  const { connectAsync: connectCasperWalletAsync } = useConnect({
    connector: new CasperWalletConnector(),
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Connect</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-4">Connect Wallet</DialogTitle>
          <DialogDescription className="flex justify-center flex-col align-center gap-4">
            <Button className="w-full" onClick={connectCasperDashAsync}>
              Casper Dash
            </Button>
            <Button className="w-full" onClick={connectCasperWalletAsync}>
              Casper Wallet
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
