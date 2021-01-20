import { Bank, BankError } from "../Bank";
import { Coin } from "../Coin";

describe("Bank", () => {
  it("should allow user-inserted coins to be deposited and stored", () => {
    const bank = new Bank();
    bank.insertCoin(new Coin(5.7, 25));
    bank.insertCoin(new Coin(2.3, 18));
    bank.insertCoin(new Coin(5, 21));
    bank.insertCoin(new Coin(2.3, 18));
    bank.insertCoin(new Coin(5, 21));
    bank.insertCoin(new Coin(5, 21));
    const coins = bank.getCurrentCoins();
    expect(coins).toEqual({
      QUARTER: 1,
      DIME: 2,
      NICKEL: 3,
    });
  });

  it("should throw an error if an invalid coin is inserted", () => {
    const bank = new Bank();
    expect(() => {
      bank.insertCoin(new Coin(2.2, 25));
    }).toThrowError(BankError.INVALID_COIN);
  });

  it("should return the total value of all user-inserted coins", () => {
    const bank = new Bank();
    bank.insertCoin(new Coin(5.7, 25));
    bank.insertCoin(new Coin(2.3, 18));
    bank.insertCoin(new Coin(5, 21));
    bank.insertCoin(new Coin(2.3, 18));
    bank.insertCoin(new Coin(5, 21));
    bank.insertCoin(new Coin(5, 21));
    const currentAmount = bank.getCurrentAmount();
    expect(currentAmount).toEqual(0.6);
  });

  it("should allow user-inserted coins to be stored in a coin store", () => {
    const bank = new Bank();
    bank.insertCoin(new Coin(5.7, 25));
    bank.insertCoin(new Coin(2.3, 18));
    bank.insertCoin(new Coin(5, 21));
    bank.insertCoin(new Coin(2.3, 18));
    bank.insertCoin(new Coin(5, 21));
    bank.insertCoin(new Coin(5, 21));
    bank.storeCurrentAmount();
    expect(bank.getBankCoins()).toEqual({
      QUARTER: 1,
      DIME: 2,
      NICKEL: 3,
    });
    expect(bank.getCurrentCoins()).toEqual({
      QUARTER: 0,
      DIME: 0,
      NICKEL: 0,
    });
  });

  test.todo("should calculate whether change can be given");

  test.todo(
    "should allow an amount of money to be withdrawn and returned as coins"
  );
});
