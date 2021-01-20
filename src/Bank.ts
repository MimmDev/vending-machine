import { Coin } from "./Coin";

export enum CoinType {
  QUARTER = "QUARTER",
  DIME = "DIME",
  NICKEL = "NICKEL",
}

type CoinDescription = {
  weight: number;
  diameter: number;
  value: number;
};

export const coinLookup: { [value in CoinType]: CoinDescription } = {
  QUARTER: { weight: 5.7, diameter: 25, value: 0.25 },
  DIME: { weight: 2.3, diameter: 18, value: 0.1 },
  NICKEL: { weight: 5, diameter: 21, value: 0.05 },
};

type CoinMap = { [key in CoinType]: number };

export enum BankError {
  INVALID_COIN = "INVALID_COIN",
}

export class Bank {
  private bankCoins: CoinMap;
  private currentCoins: CoinMap;

  constructor() {
    this.bankCoins = {
      QUARTER: 0,
      DIME: 0,
      NICKEL: 0,
    };
    this.currentCoins = {
      QUARTER: 0,
      DIME: 0,
      NICKEL: 0,
    };
  }

  insertCoin(coin: Coin) {
    const weight = coin.getWeight();
    const diameter = coin.getDiameter();
    if (
      weight === coinLookup.QUARTER.weight &&
      diameter === coinLookup.QUARTER.diameter
    ) {
      this.currentCoins.QUARTER += 1;
    } else if (
      weight === coinLookup.DIME.weight &&
      diameter === coinLookup.DIME.diameter
    ) {
      this.currentCoins.DIME += 1;
    } else if (
      weight === coinLookup.NICKEL.weight &&
      diameter === coinLookup.NICKEL.diameter
    ) {
      this.currentCoins.NICKEL += 1;
    } else {
      throw new Error(BankError.INVALID_COIN);
    }
  }

  getCurrentCoins(): CoinMap {
    return this.currentCoins;
  }

  getBankCoins(): CoinMap {
    return this.bankCoins;
  }

  getCurrentAmount(): number {
    const sum =
      this.currentCoins.QUARTER * coinLookup.QUARTER.value +
      this.currentCoins.DIME * coinLookup.DIME.value +
      this.currentCoins.NICKEL * coinLookup.NICKEL.value;
    return parseFloat(sum.toFixed(2));
  }

  storeCurrentAmount() {
    this.bankCoins.QUARTER += this.currentCoins.QUARTER;
    this.bankCoins.DIME += this.currentCoins.DIME;
    this.bankCoins.NICKEL += this.currentCoins.NICKEL;
    this.currentCoins.QUARTER = 0;
    this.currentCoins.DIME = 0;
    this.currentCoins.NICKEL = 0;
  }
}
