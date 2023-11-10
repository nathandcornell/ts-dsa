type Comparator<T> = (a: T, b: T) => number

const mergesort = <T>(values: T[], compare: Comparator<T>): T[] => {
  if (values.length <= 1) { return values }

  const sorted: T[] = []
  const midpoint = values.length / 2

  const left = mergesort(values.slice(0, midpoint), compare)
  const right = mergesort(values.slice(midpoint), compare)

  let leftPtr = 0
  let rightPtr = 0

  while (leftPtr < left.length && rightPtr < right.length) {
    const leftVal = left[leftPtr]
    const rightVal = right[rightPtr]

    if (compare(leftVal, rightVal) < 1) {
      sorted.push(leftVal)
      leftPtr++
    } else {
      sorted.push(rightVal)
      rightPtr++
    }
  }

  // Drain left
  while (leftPtr < left.length) {
    sorted.push(left[leftPtr])
    leftPtr++
  }

  // Drain right
  while (rightPtr < right.length) {
    sorted.push(right[rightPtr])
    rightPtr++
  }

  return sorted
}

export default mergesort
