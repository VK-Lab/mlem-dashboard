import React from "react";

import {Button} from '@mlem-admin/components/Button';
import {Img} from '@mlem-admin/components/Img';
import {Input} from '@mlem-admin/components/Input';
import {List} from '@mlem-admin/components/List';
import {Text} from '@mlem-admin/components/Text';
import ListLeftInfo from '@mlem-admin/components/ListLeftInfo';
import CreateItemStep from '@mlem-admin/components/CreateItemStep';

type CreateBenefitProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  | "username"
  | "useraddress"
  | "label"
  | "namecamp"
  | "text"
  | "textOne"
  | "supportingtext"
  | "inputOne"
  | "inputtext2"
  | "inputtext3"
  | "inputtext4"
  | "inputtext5"
  | "inputtext6"
  | "inputtext7"
  | "inputtext8"
  | "inputtext9"
  | "labelOne"
  | "labelTwo"
  | "createcampaignbutton"
  | "step1"
  | "step2"
  | "step3"
  | "step4"
  | "step5"
  | "loremipsum1"
  | "loremipsum3"
  | "loremipsum5"
  | "loremipsum7"
  | "missionbutton"
  | "nftsbutton"
  | "loremipsum9"
  | "addbrokerbutton"
  > &
  Partial<{
    username: string;
    useraddress: string;
    label: string;
    namecamp: string;
    text: string;
    textOne: string;
    supportingtext: string;
    inputOne: string;
    inputtext2: string;
    inputtext3: string;
    inputtext4: string;
    inputtext5: string;
    inputtext6: string;
    inputtext7: string;
    inputtext8: string;
    inputtext9: string;
    labelOne: string;
    labelTwo: string;
    createcampaignbutton: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    loremipsum1: string;
    loremipsum3: string;
    loremipsum5: string;
    loremipsum7: string;
    missionbutton: string;
    nftsbutton: string;
    loremipsum9: string;
    addbrokerbutton: string;
  }>;

const CreateBenefit: React.FC<CreateBenefitProps> = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex md:flex-col flex-row gap-3 items-start justify-center w-full">
          <ListLeftInfo />

          <div className="flex md:flex-1 flex-col gap-6 items-start justify-start w-full">
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                <Text
                  className="text-blue_gray-100 text-sm w-auto"
                  size="txtLexendSemiBold14"
                >
                  Name (*)
                </Text>
                <Input
                  name="input"
                  placeholder="input..."
                  className="!placeholder:text-gray-600 !text-gray-600 font-lexend p-0 text-left text-sm w-full"
                  wrapClassName="border border-indigo-50_0c border-solid w-full"
                  shape="round"
                  color="indigo_900_cc"
                  size="xs"
                  variant="fill"
                ></Input>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                <Text
                  className="text-blue_gray-100 text-sm w-auto"
                  size="txtLexendSemiBold14"
                >
                  Description
                </Text>
                <Input
                  name="input"
                  placeholder="input..."
                  className="!placeholder:text-gray-600 !text-gray-600 font-lexend p-0 text-left text-sm w-full"
                  wrapClassName="border border-indigo-50_0c border-solid w-full"
                  shape="round"
                  color="indigo_900_cc"
                  size="xs"
                  variant="fill"
                ></Input>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                <Text
                  className="text-blue_gray-100 text-sm w-auto"
                  size="txtLexendSemiBold14"
                >
                  Category (*)
                </Text>
                <Input
                  name="input"
                  placeholder="select..."
                  className="!placeholder:text-gray-600 !text-gray-600 font-lexend p-0 text-left text-sm w-full"
                  wrapClassName="border border-indigo-50_0c border-solid w-full"
                  shape="round"
                  color="indigo_900_cc"
                  size="xs"
                  variant="fill"
                ></Input>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                <Text
                  className="text-blue_gray-100 text-sm w-auto"
                  size="txtLexendSemiBold14"
                >
                  Source (*)
                </Text>
                <Input
                  name="input"
                  placeholder="select..."
                  className="!placeholder:text-gray-600 !text-gray-600 font-lexend p-0 text-left text-sm w-full"
                  wrapClassName="border border-indigo-50_0c border-solid w-full"
                  shape="round"
                  color="indigo_900_cc"
                  size="xs"
                  variant="fill"
                ></Input>
              </div>
            </div>
            <Button
              className="cursor-pointer flex items-center justify-center min-w-[192px]"
              leftIcon={
                <Img
                  className="h-6 mr-2"
                  src="/v2/images/img_lock.svg"
                  alt="lock"
                />
              }
              shape="round"
              color="amber_500"
              size="sm"
              variant="fill"
            >
              <div className="!text-black-900_01 font-lexend font-semibold text-base text-center">
                Create Benefit
              </div>
            </Button>
          </div>

          <CreateItemStep />
        </div>
      </div>
    </>
  );
};

CreateBenefit.defaultProps = {
  username: "Your Name",
  useraddress: "0x12...282723f1",
  label: "Label",
  namecamp: "Name Camp",
  text: "Click to upload",
  textOne: "or drag and drop",
  supportingtext: "SVG, PNG, JPG or GIF (max. 800x400px)",
  inputOne: "Input",
  inputtext2: "Placeholder",
  inputtext3: "Placeholder",
  inputtext4: "Placeholder",
  inputtext5: "Placeholder",
  inputtext6: "Placeholder",
  inputtext7: "Placeholder",
  inputtext8: "Placeholder",
  inputtext9: "Placeholder",
  labelOne: "Label",
  labelTwo: "Label",
  createcampaignbutton: "Create campain",
  step1: "1",
  step2: "2",
  step3: "3",
  step4: "4",
  step5: "5",
  loremipsum1: "Lorem ipsum dolor sit amet",
  loremipsum3: "Lorem ipsum dolor sit amet",
  loremipsum5: "Lorem ipsum dolor sit amet",
  loremipsum7: "Lorem ipsum dolor sit amet",
  missionbutton: "Mission",
  nftsbutton: "NFTs",
  loremipsum9: "Lorem ipsum dolor sit amet",
  addbrokerbutton: "Add broker",
};

export default CreateBenefit;
