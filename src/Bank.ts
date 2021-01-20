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

export const coinLookup: { [index: string]: CoinDescription } = {
  [CoinType.QUARTER]: { weight: 5.7, diameter: 25, value: 0.25 },
  [CoinType.DIME]: { weight: 2.3, diameter: 18, value: 0.1 },
  [CoinType.NICKEL]: { weight: 5, diameter: 21, value: 0.05 },
};

type CoinMap = { [index: string]: number };

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

    let found = false;
    Object.keys(coinLookup).forEach((key) => {
      if (
        weight === coinLookup[key].weight &&
        diameter === coinLookup[key].diameter
      ) {
        this.currentCoins[key] += 1;
        found = true;
      }
    });

    if (!found) {
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
    const sum = Object.keys(this.currentCoins).reduce((acc, curr) => {
      return acc + this.currentCoins[curr] * coinLookup[curr].value;
    }, 0);
    return parseFloat(sum.toFixed(2));
  }

  storeCurrentAmount() {
    Object.keys(this.currentCoins).forEach((key) => {
      this.bankCoins[key] += this.currentCoins[key];
      this.currentCoins[key] = 0;
    });
  }
}
