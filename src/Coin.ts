export class Coin {
  private weight: number;
  private diameter: number;

  constructor(weight: number, diameter: number) {
    this.weight = weight;
    this.diameter = diameter;
  }

  getWeight() {
    return this.weight;
  }

  getDiameter() {
    return this.diameter;
  }
}
