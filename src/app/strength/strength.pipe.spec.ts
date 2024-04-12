import { StrengthPipe } from "./strength.pipe";

describe("StrengthPipe", () => {
  it("should display weak if strength is 5", () => {
    let pipe = new StrengthPipe();

    let transformedValue = pipe.transform(5);

    expect(transformedValue).toEqual("5 (weak)");
  });

  it("should display strong if strength is 12", () => {
    let pipe = new StrengthPipe();

    let transformedValue = pipe.transform(12);

    expect(transformedValue).toEqual("12 (strong)");
  });

  it("should display unbelievable if strength is > 20", () => {
    let pipe = new StrengthPipe();

    let transformedValue = pipe.transform(21);

    expect(transformedValue).toEqual("21 (unbelievable)");
  });
});
