import { BigNumber } from "@ethersproject/bignumber";
import Big from "big.js";
const MOTE_RATE = 1000000000;

export const formatAddress = (address?: string) => {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
};

export const toCSPR = (rawAmount: number | string) => {
  try {
    const amount = Big(rawAmount)
      .div(MOTE_RATE)
      .round(0, Big.roundDown)
      .toNumber();

    return amount;
  } catch (error) {
    return 0;
  }
};

export const toMotes = (amount: number) => {
  try {
    const rawAmount = Big(amount)
      .times(MOTE_RATE)
      .round(0, Big.roundDown)
      .toNumber();

    return rawAmount;
  } catch (error) {
    return 0;
  }
};

export const hexToNumber = (balanceHex: string): number => {
  return balanceHex ? toCSPR(BigNumber.from(balanceHex).toNumber()) : 0;
};
