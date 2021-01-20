import { Product } from "../Product";

describe("Product", () => {
  it("should return the name", () => {
    const product = new Product("MyProduct", 2);
    expect(product.getName()).toEqual("MyProduct");
  });

  it("should return the price", () => {
    const product = new Product("MyProduct", 2);
    expect(product.getPrice()).toEqual(2);
  });
});
