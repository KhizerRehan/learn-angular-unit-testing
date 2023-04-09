describe('First Spec', () => {

  let sut;
  beforeEach(() => {
    console.log("Before Each")
    sut = {}
  });

  it('should true if true', () => {
    sut.a = false;    
    expect(sut.a).toBe(false);
  });
});
