"use client";

import { useAccount } from "@casperdash/usewallet";
import { GradientAvatar } from "@mlem-user/components/avatar/gradient-avatar";

export const UserCover = () => {
  const { publicKey } = useAccount();

  return (
    <div className="relative h-60 w-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-300 via-blue-500 to-purple-600">
      <div></div>
      <div className="absolute inset-x-0 -bottom-8 flex justify-center">
        <div className="border-4 border-white-500/75 rounded-full">
          <GradientAvatar name={publicKey ?? ""} size={100} />
        </div>
      </div>
    </div>
  );
};
