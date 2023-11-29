import { useDisconnect } from "@casperdash/usewallet";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { Button } from "@mlem-user/components/ui/button";
import { CookieKeys } from "@mlem-user/enums/cookieKeys";
import { Paths } from "@mlem-user/enums/paths";

type Props = {
  className?: string;
};

const ButtonLogout = ({ className }: Props) => {
  const router = useRouter();

  const { disconnect } = useDisconnect({
    onSuccess: () => {
      Cookies.remove(CookieKeys.TOKEN);
      router.push(Paths.HOME);
    },
  });

  const handleOnLogoutClick = () => {
    disconnect();
  };
  return (
    <Button className={className} onClick={handleOnLogoutClick}>
      Logout
    </Button>
  );
};

export default ButtonLogout;
