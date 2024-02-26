import React from "react";

import {Button} from '@mlem-admin/components/Button';
import {Img} from '@mlem-admin/components/Img';
import {Input} from '@mlem-admin/components/Input';
import {List} from '@mlem-admin/components/List';
import {Text} from '@mlem-admin/components/Text';
import ListLeftInfo from '@mlem-admin/components/ListLeftInfo';

type CreateNftCollectionProps = Omit<
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

const CreateNftCollection: React.FC<CreateNftCollectionProps> = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex md:flex-col flex-row gap-3 items-start justify-center w-full">
          <ListLeftInfo />

          <div className="flex md:flex-1 flex-col gap-6 items-start justify-start w-auto md:w-full">
            <div className="flex flex-col items-start justify-start max-w-[724px] w-full">
              <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                <Text
                  className="text-blue_gray-100 text-sm w-auto"
                  size="txtLexendSemiBold14"
                >
                  {props?.label}
                </Text>
                <Input
                  name="input"
                  placeholder="Placeholder"
                  className="!placeholder:text-gray-600 !text-gray-600 font-lexend p-0 text-left text-sm w-full"
                  wrapClassName="border border-indigo-50_0c border-solid w-full"
                  shape="round"
                  color="indigo_900_cc"
                  size="xs"
                  variant="fill"
                ></Input>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-start justify-start w-full">
              <Text
                className="text-gray-300 text-sm w-auto"
                size="txtLexendRegular14"
              >
                {props?.namecamp}
              </Text>
              <div className="bg-indigo-900_cc flex flex-col items-center justify-start sm:px-5 px-6 py-4 rounded w-80">
                <div className="flex flex-col gap-3 items-center justify-start w-full">
                  <Button
                    className="border border-indigo-400 border-solid flex h-10 items-center justify-center rounded-lg w-10"
                    color="indigo_900_01"
                    size="xs"
                    variant="fill"
                  >
                    <Img
                      className="h-5"
                      src="/v2/images/img_arrowleft.svg"
                      alt="arrowleft"
                    />
                  </Button>
                  <div className="flex flex-col gap-1 items-center justify-start w-full">
                    <div className="flex flex-row gap-1 items-start justify-center w-full">
                      <div className="flex flex-col items-center justify-center w-auto">
                        <Text
                          className="text-deep_purple-200 text-sm w-auto"
                          size="txtInterSemiBold14"
                        >
                          {props?.text}
                        </Text>
                      </div>
                      <Text
                        className="text-blue_gray-100 text-sm w-auto"
                        size="txtInterRegular14"
                      >
                        {props?.textOne}
                      </Text>
                    </div>
                    <Text
                      className="text-blue_gray-100 text-center text-xs w-full"
                      size="txtInterRegular12"
                    >
                      {props?.supportingtext}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-start justify-start max-w-[632px] w-full">
              <Text
                className="text-gray-300 text-sm w-auto"
                size="txtLexendRegular14"
              >
                {props?.inputOne}
              </Text>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <List
                    className="sm:flex-col flex-row gap-2 grid sm:grid-cols-1 md:grid-cols-3 grid-cols-5 justify-center w-full"
                    orientation="horizontal"
                  >
                    <div className="flex flex-col items-start justify-start sm:ml-[0] w-[120px]">
                      <div className="flex flex-col items-start justify-start w-full">
                        <div className="bg-indigo-900_cc border border-indigo-50_0c border-solid flex flex-col items-center justify-start px-2.5 py-3 rounded w-full">
                          <div className="flex flex-col items-center justify-start w-full">
                            <Text
                              className="text-gray-600 text-sm w-auto"
                              size="txtLexendRegular14Gray600"
                            >
                              {props?.inputtext2}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start sm:ml-[0] w-[120px]">
                      <div className="flex flex-col items-start justify-start w-full">
                        <div className="bg-indigo-900_cc border border-indigo-50_0c border-solid flex flex-col items-center justify-start px-2.5 py-3 rounded w-full">
                          <div className="flex flex-col items-center justify-start w-full">
                            <Text
                              className="text-gray-600 text-sm w-auto"
                              size="txtLexendRegular14Gray600"
                            >
                              {props?.inputtext3}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start sm:ml-[0] w-[120px]">
                      <div className="flex flex-col items-start justify-start w-full">
                        <div className="bg-indigo-900_cc border border-indigo-50_0c border-solid flex flex-col items-center justify-start px-2.5 py-3 rounded w-full">
                          <div className="flex flex-col items-center justify-start w-full">
                            <Text
                              className="text-gray-600 text-sm w-auto"
                              size="txtLexendRegular14Gray600"
                            >
                              {props?.inputtext4}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start sm:ml-[0] w-[120px]">
                      <div className="flex flex-col items-start justify-start w-full">
                        <div className="bg-indigo-900_cc border border-indigo-50_0c border-solid flex flex-col items-center justify-start px-2.5 py-3 rounded w-full">
                          <div className="flex flex-col items-center justify-start w-full">
                            <Text
                              className="text-gray-600 text-sm w-auto"
                              size="txtLexendRegular14Gray600"
                            >
                              {props?.inputtext5}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start sm:ml-[0] w-[120px]">
                      <div className="flex flex-col items-start justify-start w-full">
                        <div className="bg-indigo-900_cc border border-indigo-50_0c border-solid flex flex-col items-center justify-start px-2.5 py-3 rounded w-full">
                          <div className="flex flex-col items-center justify-start w-full">
                            <Text
                              className="text-gray-600 text-sm w-auto"
                              size="txtLexendRegular14Gray600"
                            >
                              {props?.inputtext6}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </List>
                  <List
                    className="sm:flex-col flex-row gap-2 grid grid-cols-3 w-3/5"
                    orientation="horizontal"
                  >
                    <div className="flex flex-col items-start justify-start w-[120px]">
                      <div className="flex flex-col items-start justify-start w-full">
                        <div className="bg-indigo-900_cc border border-indigo-50_0c border-solid flex flex-col items-center justify-start px-2.5 py-3 rounded w-full">
                          <div className="flex flex-col items-center justify-start w-full">
                            <Text
                              className="text-gray-600 text-sm w-auto"
                              size="txtLexendRegular14Gray600"
                            >
                              {props?.inputtext7}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start w-[120px]">
                      <div className="flex flex-col items-start justify-start w-full">
                        <div className="bg-indigo-900_cc border border-indigo-50_0c border-solid flex flex-col items-center justify-start px-2.5 py-3 rounded w-full">
                          <div className="flex flex-col items-center justify-start w-full">
                            <Text
                              className="text-gray-600 text-sm w-auto"
                              size="txtLexendRegular14Gray600"
                            >
                              {props?.inputtext8}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start w-[120px]">
                      <div className="flex flex-col items-start justify-start w-full">
                        <div className="bg-indigo-900_cc border border-indigo-50_0c border-solid flex flex-col items-center justify-start px-2.5 py-3 rounded w-full">
                          <div className="flex flex-col items-center justify-start w-full">
                            <Text
                              className="text-gray-600 text-sm w-auto"
                              size="txtLexendRegular14Gray600"
                            >
                              {props?.inputtext9}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </List>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start max-w-[724px] w-full">
              <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                <Text
                  className="text-blue_gray-100 text-sm w-auto"
                  size="txtLexendSemiBold14"
                >
                  {props?.labelOne}
                </Text>
                <Input
                  name="input_Two"
                  placeholder="Placeholder"
                  className="!placeholder:text-gray-600 !text-gray-600 font-lexend p-0 text-left text-sm w-full"
                  wrapClassName="border border-indigo-50_0c border-solid w-full"
                  shape="round"
                  color="indigo_900_cc"
                  size="xs"
                  variant="fill"
                ></Input>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start max-w-[724px] w-full">
              <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                <Text
                  className="text-blue_gray-100 text-sm w-auto"
                  size="txtLexendSemiBold14"
                >
                  {props?.labelTwo}
                </Text>
                <Input
                  name="input_Three"
                  placeholder="Placeholder"
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
                {props?.createcampaignbutton}
              </div>
            </Button>
          </div>
          <div className="flex flex-1 flex-col items-start justify-start w-full">
            <div className="flex flex-col items-start justify-center w-auto">
              <div className="flex flex-row gap-4 items-start justify-start w-auto">
                <div className="flex flex-col w-[60px] h-[300px] md:h-auto items-start justify-start">
                  <div className="bg-deep_purple-900 border-2 border-indigo-900_02 border-solid flex flex-col h-6 items-center justify-start p-0.5 rounded w-6">
                    <Text
                      className="text-center text-deep_purple-200_01 text-sm"
                      size="txtBeVietnamProSemiBold14Deeppurple20001"
                    >
                      {props?.step1}
                    </Text>
                  </div>
                  <Img
                    className="h-5 w-full"
                    src="/v2/images/img_user_indigo_900_03.svg"
                    alt="user"
                  />
                  <div className="bg-deep_purple-900 border-2 border-indigo-900_02 border-solid flex flex-col h-6 items-center justify-start p-0.5 rounded w-6">
                    <Text
                      className="text-center text-deep_purple-200_01 text-sm"
                      size="txtBeVietnamProSemiBold14Deeppurple20001"
                    >
                      {props?.step2}
                    </Text>
                  </div>
                  <Img
                    className="h-5 w-full"
                    src="/v2/images/img_user_indigo_900_03.svg"
                    alt="user_One"
                  />
                  <div className="bg-deep_purple-900 border-2 border-indigo-900_02 border-solid flex flex-col h-6 items-end justify-end p-0.5 rounded w-6">
                    <Text
                      className="mr-1 text-center text-deep_purple-200_01 text-sm tracking-[0.28px]"
                      size="txtBasierCircleMedium14"
                    >
                      {props?.step3}
                    </Text>
                  </div>
                  <Img
                    className="h-5 w-full"
                    src="/v2/images/img_user_indigo_900_03.svg"
                    alt="user_Two"
                  />
                  <div className="bg-deep_purple-900 border-2 border-indigo-900_02 border-solid flex flex-col h-6 items-end justify-end p-0.5 rounded w-6">
                    <Text
                      className="mr-1 text-center text-deep_purple-200_01 text-sm tracking-[0.28px]"
                      size="txtBasierCircleMedium14"
                    >
                      {props?.step4}
                    </Text>
                  </div>
                  <Img
                    className="h-full w-full"
                    src="/v2/images/img_frame1321315162.svg"
                    alt="frame1321315162"
                  />
                  <Text
                    className="bg-deep_purple-900 border-2 border-indigo-900_02 border-solid flex h-6 items-center justify-center rounded text-center text-deep_purple-200_01 text-sm w-6"
                    size="txtBeVietnamProSemiBold14Deeppurple20001"
                  >
                    {props?.step5}
                  </Text>
                </div>
                <div className="flex flex-col gap-6 items-start justify-start w-[316px]">
                  <Text
                    className="text-blue_gray-50 text-sm w-full"
                    size="txtLexendRegular14Bluegray50"
                  >
                    {props?.loremipsum1}
                  </Text>
                  <Text
                    className="text-blue_gray-50 text-sm w-full"
                    size="txtLexendRegular14Bluegray50"
                  >
                    {props?.loremipsum3}
                  </Text>
                  <Text
                    className="text-blue_gray-50 text-sm w-full"
                    size="txtLexendRegular14Bluegray50"
                  >
                    {props?.loremipsum5}
                  </Text>
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text
                      className="text-blue_gray-50 text-sm w-full"
                      size="txtLexendRegular14Bluegray50"
                    >
                      {props?.loremipsum7}
                    </Text>
                    <div className="flex flex-col h-11 md:h-auto items-center justify-start w-auto">
                      <div className="bg-gray-900 flex flex-row h-11 md:h-auto items-start justify-start rounded">
                        <Button
                          className="!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm w-[120px]"
                          shape="round"
                          color="indigo_500_7f"
                          size="sm"
                          variant="fill"
                        >
                          {props?.missionbutton}
                        </Button>
                        <Button
                          className="!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm w-[120px]"
                          shape="round"
                          color="gray_900"
                          size="sm"
                          variant="fill"
                        >
                          {props?.nftsbutton}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Text
                      className="text-blue_gray-50 text-sm w-full"
                      size="txtLexendRegular14Bluegray50"
                    >
                      {props?.loremipsum9}
                    </Text>
                    <Button
                      className="!text-white-A700 cursor-pointer font-lexend font-semibold h-11 text-base text-center w-[316px]"
                      shape="round"
                      color="indigo_500"
                      size="sm"
                      variant="fill"
                    >
                      {props?.addbrokerbutton}
                    </Button>
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

CreateNftCollection.defaultProps = {
  username: "Yourname",
  useraddress: "0x544...42865644",
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

export default CreateNftCollection;
