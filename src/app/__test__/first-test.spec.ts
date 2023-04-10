describe('First Spec', () => {

  let sut;
  beforeEach(() => {
    sut = {}
  });

  it('should true if true', () => {
    sut.a = false;    
    expect(sut.a).toBe(false);
  });
});
