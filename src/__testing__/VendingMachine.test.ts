import { Coin } from "../Coin";
import { Product } from "../Product";
import { VendingMachine } from "../VendingMachine";

describe("Vending Machine", () => {
  it("should let the user add coins", () => {
    const vendingMachine = new VendingMachine([]);
    vendingMachine.insertCoin(new Coin(5.7, 25));
    expect(vendingMachine.displayCoinStatus()).toEqual("$0.25");
  });

  it("should display INSERT COIN if no coins have been added", () => {
    const vendingMachine = new VendingMachine([]);
    expect(vendingMachine.displayCoinStatus()).toEqual("INSERT COIN");
  });

  it("should display the current amount if coins have been added", () => {
    const vendingMachine = new VendingMachine([]);
    vendingMachine.insertCoin(new Coin(5.7, 25));
    vendingMachine.insertCoin(new Coin(2.3, 18));
    vendingMachine.insertCoin(new Coin(5, 21));
    vendingMachine.insertCoin(new Coin(2.3, 18));
    vendingMachine.insertCoin(new Coin(5, 21));
    vendingMachine.insertCoin(new Coin(5, 21));
    expect(vendingMachine.displayCoinStatus()).toEqual("$0.6");
  });

  it("should allow a user to purchase a product if enough coins have been inserted", () => {
    const products = [new Product("Cola", 1)];
    const vendingMachine = new VendingMachine(products);
    vendingMachine.insertCoin(new Coin(5.7, 25));
    vendingMachine.insertCoin(new Coin(5.7, 25));
    vendingMachine.insertCoin(new Coin(5.7, 25));
    vendingMachine.insertCoin(new Coin(5.7, 25));
    const message = vendingMachine.purchaseProduct("Cola");
    expect(message).toEqual("THANK YOU");
    expect(vendingMachine.getProductInformation("Cola")).toEqual(
      "Name: Cola, Price: $1, Quantity: 0"
    );
  });

  it("should reset the current amount to 0 after a purchase has been made", () => {
    const products = [new Product("Cola", 1)];
    const vendingMachine = new VendingMachine(products);
    vendingMachine.insertCoin(new Coin(5.7, 25));
    vendingMachine.insertCoin(new Coin(5.7, 25));
    vendingMachine.insertCoin(new Coin(5.7, 25));
    vendingMachine.insertCoin(new Coin(5.7, 25));
    vendingMachine.purchaseProduct("Cola");
    expect(vendingMachine.displayCoinStatus()).toEqual("INSERT COIN");
  });

  it("should display the chosen product's price if not enough coins have been inserted", () => {
    const products = [new Product("Cola", 1)];
    const vendingMachine = new VendingMachine(products);
    const message = vendingMachine.purchaseProduct("Cola");
    expect(message).toEqual("PRICE: $1");
  });

  test.todo(
    "should return change if a product costs less than the amount inserted"
  );

  test.todo(
    "should allow the user to return all inserted coins from the machine"
  );

  it("should display SOLD OUT if the user tries to purchase a sold out product", () => {
    const products = [new Product("Cola", 1)];
    const vendingMachine = new VendingMachine(products);
    vendingMachine.insertCoin(new Coin(5.7, 25));
    vendingMachine.insertCoin(new Coin(5.7, 25));
    vendingMachine.insertCoin(new Coin(5.7, 25));
    vendingMachine.insertCoin(new Coin(5.7, 25));
    vendingMachine.purchaseProduct("Cola");
    vendingMachine.insertCoin(new Coin(5.7, 25));
    vendingMachine.insertCoin(new Coin(5.7, 25));
    vendingMachine.insertCoin(new Coin(5.7, 25));
    vendingMachine.insertCoin(new Coin(5.7, 25));
    const message = vendingMachine.purchaseProduct("Cola");
    expect(message).toEqual("SOLD OUT");
  });

  test.todo(
    "should display EXACT CHANGE ONLY if the machine does not have enough coins to make change"
  );
});
