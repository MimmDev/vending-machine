import { Coin } from "../Coin";

describe("Coin", () => {
  it("should return the weight", () => {
    const coin = new Coin(1, 2);
    expect(coin.getWeight()).toEqual(1);
  });

  it("should return the diameter", () => {
    const coin = new Coin(1, 2);
    expect(coin.getDiameter()).toEqual(2);
  });
});
