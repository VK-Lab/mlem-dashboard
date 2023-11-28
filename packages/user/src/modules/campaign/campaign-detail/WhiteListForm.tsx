import { useAccount } from "@casperdash/usewallet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mlem-user/components/ui/button";
import { useToast } from "@mlem-user/components/ui/use-toast";
import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { useAddUserToWhiteList } from "@mlem-user/services/app/campaign/hooks/useAddUserToWhiteList";
import { useCheckUserInWhiteList } from "@mlem-user/services/app/campaign/hooks/useCheckUserInWhiteList";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Props = {
  campaignId: string;
};

const validationSchema = z.object({
  email: z.string().email(),
});

type SubmitValues = z.infer<typeof validationSchema>;

const WhiteListForm = ({ campaignId }: Props) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const formMethods = useForm<SubmitValues>({
    resolver: zodResolver(validationSchema),
  });
  const { publicKey } = useAccount();
  const addUserToWhiteListMutation = useAddUserToWhiteList({
    onSuccess: () => {
      toast({
        title: "Added your email to whitelist successfully!",
      });
      queryClient.invalidateQueries([QueryKeys.CAMPAIGN, QueryKeys.WHITELIST]);
    },
    onError: () => {
      toast({
        title: "An error occurred!",
      });
    },
  });
  const { data, isLoading } = useCheckUserInWhiteList({
    campaignId,
    publicKey: publicKey!,
  });

  const handleOnSubmit = (data: SubmitValues) => {
    if (!publicKey) {
      return;
    }

    addUserToWhiteListMutation.mutate({
      campaignId,
      publicKey,
      email: data.email,
    });
  };

  if (isLoading) {
    return (
      <div className="mt-10 flex justify-center">
        <div className="typo-h4">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {data?.isExisted ? (
        <div className="mt-10 flex">
          <div className="typo-h6">
            <p className="max-w-md">
              You are already registered the Whitelist. Meanwhile please join
              our{" "}
              <a
                href="https://t.me/CasperDash_Official"
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="text-red-600 underline"
              >
                Telegram Group
              </a>{" "}
              for upcoming updates.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-10 flex justify-center">
          <form
            className="sm:flex justify-center"
            onSubmit={formMethods.handleSubmit(handleOnSubmit)}
          >
            <input
              {...formMethods.register("email")}
              type="email"
              placeholder="Enter your email to receive WL"
              aria-label="Email Address"
              required
              className="bg-transparent border-grey-500 border-2 mb-2 mr-2 placeholder:italic placeholder-gray-50 py-1 px-2 text-grey[500] h-12 w-64 sm:mb-0 rounded"
            />
            <Button type="submit" className="w-32 h-12">
              Register
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default WhiteListForm;
