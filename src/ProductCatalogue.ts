import { Product } from "./Product";

type CatalogueEntry = { name: string; price: number; quantity: number };
type ProductMap = {
  [index: string]: CatalogueEntry;
};

export enum ProductError {
  NOT_FOUND = "NOT FOUND",
  SOLD_OUT = "SOLD OUT",
}

export class ProductCatalogue {
  private productMap: ProductMap;

  constructor(products: Product[]) {
    this.productMap = {};
    products.forEach((product) => {
      this.addProduct(product);
    });
  }

  addProduct(product: Product) {
    const productName = product.getName();
    if (this.productMap[productName]) {
      this.productMap[productName].quantity += 1;
    } else {
      this.productMap[productName] = {
        name: product.getName(),
        price: product.getPrice(),
        quantity: 1,
      };
    }
  }

  removeProduct(productName: string) {
    const product = this.productMap[productName];

    if (!product) {
      throw new Error(ProductError.NOT_FOUND);
    }

    if (!product.quantity) {
      throw new Error(ProductError.SOLD_OUT);
    }

    product.quantity -= 1;
  }

  getCatalogueEntry(productName: string): CatalogueEntry {
    const product = this.productMap[productName];
    if (!product) {
      throw new Error(ProductError.NOT_FOUND);
    }
    return product;
  }
}
