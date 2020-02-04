import { getLimits3 } from '../store/actions/actionHelpers';
import { isFileAllowed, toCurrency } from '../helpers';



describe('Test toCurrency func', () => {

  it('should return ₱0.00', () => {
    expect(toCurrency(0)).toEqual('₱0.00');
  })

  it('should return ₱1.00', () => {
    expect(toCurrency(1)).toEqual('₱1.00');
  })


  it('should return ₱2.00', () => {
    expect(toCurrency(2)).toEqual('₱2.00');
  })
  it('should return ₱53.00', () => {
    expect(toCurrency(53)).toEqual('₱53.00');
  })
  it('should return ₱100.00', () => {
    expect(toCurrency(100)).toEqual('₱100.00');
  })
})


describe('Test isFileAllowed func', () => {

  it("should return false with filename='asasasesaea.png.ddd'", () => {
    const file: File = {
      lastModified: 123123123,
      size: 22222,
      type: '',
      name: 'asasasesaea.png.ddd',
      slice: (start, stop) => {
        return new Blob();
      }
    }

    expect(isFileAllowed([file])).toEqual({ isAllowed: false, name: '' });
  })

})


describe('Test getLimits3 func', () => {


  describe('maxRows=15', () => {
    it('should return 0,15 | page = 0', () => {
      expect(getLimits3(0)).toEqual({ from: 0, to: 15 })
    });


    it('should return 16,30 | page = 1', () => {
      expect(getLimits3(1)).toEqual({ from: 16, to: 30 })
    });


    it('should return 31,45 | page = 2', () => {
      expect(getLimits3(2)).toEqual({ from: 31, to: 45 })
    });
  })


  describe('maxRows=10', () => {

    it('should return 0,10 | page=0', () => {
      expect(getLimits3(0, 10)).toEqual({ from: 0, to: 10 })
    });


    it('should return 11,20 | page=1', () => {
      expect(getLimits3(1, 10)).toEqual({ from: 11, to: 20 })
    });


    it('should return 21,30 | page=2', () => {
      expect(getLimits3(2, 10)).toEqual({ from: 21, to: 30 })
    });

  })
  describe('maxRows=5', () => {

    it('should return 0,5 | page=0', () => {
      expect(getLimits3(0, 5)).toEqual({ from: 0, to: 5 })
    });


    it('should return 6,10 | page=1', () => {
      expect(getLimits3(1, 5)).toEqual({ from: 6, to: 10 })
    });


    it('should return 11,15 | page=2', () => {
      expect(getLimits3(2, 5)).toEqual({ from: 11, to: 15 })
    });

  })

})