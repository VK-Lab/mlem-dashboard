import Big from 'big.js';
const MOTE_RATE = 1_000_000_000;

export const formatAddress = (address?: string) => {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
};

export const toCSPR = (rawAmount: number) => {
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
  return balanceHex ? toCSPR(new Big(balanceHex).toNumber()) : 0;
};

export const slugify = (str: string) => {
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
};
