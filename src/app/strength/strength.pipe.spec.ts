import {StrengthPipe} from "./strength.pipe";

describe('StrengthPipe Spec', () => {
  it('should display (weak) if strength is below 10', () => {
     let pipe = new StrengthPipe();

     expect(pipe.transform(0)).toEqual('0 (weak)')
     expect(pipe.transform(5)).toEqual('5 (weak)')
  });

  it('should display (strong) if strength is >= 10 and < 20', () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(10)).toEqual('10 (strong)')
    expect(pipe.transform(19)).toEqual('19 (strong)')
  });

  it('should display (unbelievable) if strength is below above >=20', () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(20)).toEqual('20 (unbelievable)')
    expect(pipe.transform(100)).toEqual('100 (unbelievable)')
  });

});
