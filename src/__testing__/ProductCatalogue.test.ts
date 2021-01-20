import { Product } from "../Product";
import { ProductCatalogue, ProductError } from "../ProductCatalogue";

describe("ProductCatalogue", () => {
  it("should allow products to be added to the catalogue", () => {
    const catalogue = new ProductCatalogue([]);
    catalogue.addProduct(new Product("Cola", 1));
    catalogue.addProduct(new Product("Chips", 0.5));
    catalogue.addProduct(new Product("Candy", 0.65));

    const productMap = catalogue.getCatalogueOverview();
    expect(productMap).toEqual({
      Cola: { name: "Cola", price: 1, quantity: 1 },
      Chips: { name: "Chips", price: 0.5, quantity: 1 },
      Candy: { name: "Candy", price: 0.65, quantity: 1 },
    });
  });

  it("should allow products to be removed and returned from the catalogue", () => {
    const catalogue = new ProductCatalogue([new Product("Cola", 1)]);
    const product = catalogue.removeProduct("Cola");
    const productMap = catalogue.getCatalogueOverview();
    expect(product).toEqual(new Product("Cola", 1));
    expect(productMap).toEqual({
      Cola: { name: "Cola", price: 1, quantity: 0 },
    });
  });

  it("should throw an error if an out of stock product is removed", () => {
    const catalogue = new ProductCatalogue([new Product("Cola", 1)]);
    catalogue.removeProduct("Cola");
    expect(() => {
      catalogue.removeProduct("Cola");
    }).toThrowError(ProductError.SOLD_OUT);
  });

  it("should throw an error if an invalid product is removed", () => {
    const catalogue = new ProductCatalogue([new Product("Cola", 1)]);
    expect(() => {
      catalogue.removeProduct("NonExistentProduct");
    }).toThrowError(ProductError.NOT_FOUND);
  });

  it("should return a list of products, including their prices and quantities", () => {
    const products = [
      new Product("Cola", 1),
      new Product("Chips", 0.5),
      new Product("Candy", 0.65),
      new Product("Chips", 0.5),
      new Product("Candy", 0.65),
      new Product("Candy", 0.65),
    ];
    const catalogue = new ProductCatalogue(products);
    const productMap = catalogue.getCatalogueOverview();
    expect(productMap).toEqual({
      Cola: { name: "Cola", price: 1, quantity: 1 },
      Chips: { name: "Chips", price: 0.5, quantity: 2 },
      Candy: { name: "Candy", price: 0.65, quantity: 3 },
    });
  });
});
