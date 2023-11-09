import Heap from "./Heap"

describe("Heap()", () => {
  describe("push()", () => {
    const minHeap = new Heap<number>((a, b) => a - b)
    const values = [
      [9, 9],
      [8, 8],
      [7, 7],
      [6, 6],
      [5, 5],
      [4, 4],
      [3, 3],
      [2, 2],
      [1, 1],
      [100, 1],
      [-1, -1],
      [50, -1],
      [50, -1],
      [-3, -3]
    ]

    it.each(values)('after push(%i), peek returns %i', (value, expected) => {
      minHeap.push(Number(value))
      expect(minHeap.peek()).toEqual(expected)
    })
  })

  describe("pop()", () => {
    const minHeap = new Heap<number>((a, b) => a - b)
    const values = [
      [9, 9],
      [8, 8],
      [7, 7],
      [6, 6],
      [5, 5],
      [4, 4],
      [3, 3],
      [2, 2],
      [1, 1],
      [100, 1],
      [-1, -1],
      [50, -1],
      [50, -1],
      [-3, -3]
    ]
    const expectedValues = [];

    for (const [value] of values) {
      minHeap.push(value)
      expectedValues.push(value);
    }

    expectedValues.sort((a, b) => a - b);

    it.each(expectedValues)('pop() returns %i', (expected) => {
      expect(minHeap.pop()).toEqual(expected)
    })
  })

  describe("size()", () => {
    const minHeap = new Heap<number>((a, b) => a - b)
    const length = 10

    const values: number[] = Array.from({ length }, (_value, idx) => idx + 1)

    it.each(values)('size() returns %i', (expected) => {
      minHeap.push(expected)
      expect(minHeap.size()).toEqual(expected)
    })

    values.sort((a, b) => b - a)

    it.each(values)('size() returns %i', (expected) => {
      expect(minHeap.size()).toEqual(expected)
      minHeap.pop()
      expect(minHeap.size()).toEqual(expected - 1)
    })
  })

  xdescribe('peek() is throughly tested in the push tests', () => { return })
})
