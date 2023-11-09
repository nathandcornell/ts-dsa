type Comparator = (a: number, b: number) => number

const quicksort = (values: number[], comparator: Comparator): number[] => {
  const sortedValues = [...values]
  sort(sortedValues, comparator, 0, sortedValues.length - 1)
  return sortedValues
}

const sort = (values: number[], comparator: Comparator, startIdx: number, endIdx: number) => {
  if (endIdx - startIdx <= 0) { return }

  let leftPtr = startIdx
  let rightPtr = startIdx
  const pivot = Math.floor(Math.random() * (endIdx - startIdx + 1)) + startIdx
  const pivotVal = values[pivot]

  swap(values, startIdx, pivot)

  while (rightPtr <= endIdx) {
    if (comparator(pivotVal, values[rightPtr]) > 0) {
      leftPtr++
      swap(values, leftPtr, rightPtr)
    }

    rightPtr++
  }

  swap(values, startIdx, leftPtr)

  sort(values, comparator, startIdx, leftPtr - 1)
  sort(values, comparator, leftPtr + 1, endIdx)
}

const swap = (values: number[], idxA: number, idxB: number) => {
  [values[idxA], values[idxB]] = [values[idxB], values[idxA]]
}

export default quicksort
