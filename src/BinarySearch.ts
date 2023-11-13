type Comparator<T> = (a: T, b: T) => number

const binarySearch = <T>(allValues: T[], value: T, compare: Comparator<T>): number | null => {
  if (allValues.length < 1) { return null }

  let startIdx = 0
  let endIdx = allValues.length

  while (startIdx <= endIdx) {
    const midpoint = Math.floor((endIdx - startIdx) / 2) + startIdx
    const midpointValue = allValues[midpoint]
    const comparedWithMidpoint = compare(value, midpointValue)

    if (comparedWithMidpoint === 0) {
      return midpoint
    }

    if (comparedWithMidpoint < 0) {
      endIdx = midpoint - 1
    } else {
      startIdx = midpoint + 1
    }
  }

  return null
}

export default binarySearch
