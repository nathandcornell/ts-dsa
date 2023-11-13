import binarySearch from './BinarySearch'

describe('binarySearch()', () => {
  const searchSpace = Array.from({ length: 10000 }, (_val, idx) => idx + 1)
  const values = [1, 10000, 100, 523, 1099, 258, 333, 474, 2987, 9922, 328]
  const compare = (a: number, b: number) => { return a - b }

  it.each(values)('binarySearch(%i) returns the expected array index', (value) => {
    expect(binarySearch<number>(searchSpace, value, compare)).toEqual(value - 1)
  })

  it('returns null if array does not include value', () => {
    expect(binarySearch<number>(searchSpace, 11000, compare)).toBeNull()
  })

  it('returns null if array is empty', () => {
    expect(binarySearch<number>([], 1, compare)).toBeNull()
  })
})
