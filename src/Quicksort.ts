type Comparator = (a: number, b: number) => number

const quicksort = (values: number[], compare: Comparator): number[] => {
  const sortedValues = [...values]
  sortSubset(sortedValues, compare, 0, sortedValues.length - 1)
  return sortedValues
}

const sortSubset = (values: number[], compare: Comparator, startIdx: number, endIdx: number) => {
  if (endIdx - startIdx <= 0) { return }

  const partitionIdx = Math.floor(Math.random() * (endIdx - startIdx) + 1) + startIdx
  const partitionValue = values[partitionIdx]

  let leftPtr = startIdx
  let rightPtr = startIdx

  // Move the partition to the start of our range
  swap(values, partitionIdx, startIdx)

  // Sort items to left and right sides of partition index
  while(rightPtr <= endIdx) {
    if(compare(partitionValue, values[rightPtr]) > 0) {
      leftPtr++
      swap(values, leftPtr, rightPtr)
    }

    rightPtr++
  }

  // Move partition back to the middle of the range
  swap(values, startIdx, leftPtr)

  // Recursively sort the left and right ranges separately
  sortSubset(values, compare, startIdx, leftPtr - 1)
  sortSubset(values, compare, leftPtr + 1, endIdx)
}

const swap = (values: number[], idxA: number, idxB: number) => {
  [values[idxA], values[idxB]] = [values[idxB], values[idxA]]
}

export default quicksort
