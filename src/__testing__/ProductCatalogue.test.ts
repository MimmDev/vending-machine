import { Product } from "../Product";
import { ProductCatalogue, ProductError } from "../ProductCatalogue";

describe("ProductCatalogue", () => {
  it("should allow products to be added to the catalogue", () => {
    const catalogue = new ProductCatalogue([]);
    catalogue.addProduct(new Product("Cola", 1));
    catalogue.addProduct(new Product("Chips", 0.5));
    catalogue.addProduct(new Product("Candy", 0.65));

    const cola = catalogue.getCatalogueEntry("Cola");
    expect(cola).toEqual({ name: "Cola", price: 1, quantity: 1 });
    const chips = catalogue.getCatalogueEntry("Chips");
    expect(chips).toEqual({ name: "Chips", price: 0.5, quantity: 1 });
    const candy = catalogue.getCatalogueEntry("Candy");
    expect(candy).toEqual({ name: "Candy", price: 0.65, quantity: 1 });
  });

  it("should allow products to be removed from the catalogue", () => {
    const catalogue = new ProductCatalogue([new Product("Cola", 1)]);
    catalogue.removeProduct("Cola");
    const cola = catalogue.getCatalogueEntry("Cola");
    expect(cola).toEqual({ name: "Cola", price: 1, quantity: 0 });
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

  it("should return a product's information", () => {
    const products = [new Product("Cola", 1)];
    const catalogue = new ProductCatalogue(products);
    const product = catalogue.getCatalogueEntry("Cola");
    expect(product).toEqual({
      name: "Cola",
      price: 1,
      quantity: 1,
    });
  });

  it("should throw an error if the requested product information is invalid", () => {
    const catalogue = new ProductCatalogue([]);
    expect(() => {
      catalogue.getCatalogueEntry("Cola");
    }).toThrowError(ProductError.NOT_FOUND);
  });
});
