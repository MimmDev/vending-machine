import { Product } from "./Product";

type CatalogueEntry = { name: string; price: number; quantity: number };
type ProductMap = {
  [index: string]: CatalogueEntry;
};

export enum ProductError {
  NOT_FOUND = "NOT_FOUND",
  OUT_OF_STOCK = "OUT_OF_STOCK",
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

  removeProduct(productName: string): Product {
    const product = this.productMap[productName];

    if (!product) {
      throw new Error(ProductError.NOT_FOUND);
    }

    if (!product.quantity) {
      throw new Error(ProductError.OUT_OF_STOCK);
    }

    product.quantity -= 1;
    return new Product(product.name, product.price);
  }

  getCatalogueOverview(): ProductMap {
    return this.productMap;
  }
}
