import { Bank } from "./Bank";
import { Coin } from "./Coin";
import { Product } from "./Product";
import { ProductCatalogue } from "./ProductCatalogue";

enum VendingMessage {
  INSERT_COIN = "INSERT COIN",
  PRICE = "PRICE",
  THANK_YOU = "THANK YOU",
}

export class VendingMachine {
  private productCatalogue: ProductCatalogue;
  private bank: Bank;

  constructor(products: Product[]) {
    this.productCatalogue = new ProductCatalogue(products);
    this.bank = new Bank();
  }

  insertCoin(coin: Coin) {
    this.bank.insertCoin(coin);
  }

  displayCoinStatus(): string {
    const currentAmount = this.bank.getCurrentAmount();
    if (currentAmount === 0) {
      return VendingMessage.INSERT_COIN;
    }
    return `$${currentAmount}`;
  }

  getProductInformation(productName: string): string {
    const product = this.productCatalogue.getCatalogueEntry(productName);
    return `Name: ${product.name}, Price: $${product.price}, Quantity: ${product.quantity}`;
  }

  purchaseProduct(productName: string): string {
    const product = this.productCatalogue.getCatalogueEntry(productName);
    const currentAmount = this.bank.getCurrentAmount();

    if (currentAmount < product.price) {
      return `${VendingMessage.PRICE}: $${product.price}`;
    }

    try {
      this.productCatalogue.removeProduct(productName);
    } catch (e) {
      return e.message;
    }

    this.bank.storeCurrentAmount();
    return VendingMessage.THANK_YOU;
  }
}
