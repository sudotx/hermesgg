import BigNumber from 'bignumber.js';

export const formatTokenAmount = (amount: string | number, decimals: number = 18): string => {
  return new BigNumber(amount).shiftedBy(-decimals).toFormat(4);
};
