const binarySearch = (allValues: number[], value: number): number | null => {
  if (allValues.length < 1) { return null }

  let startIdx = 0
  let endIdx = allValues.length - 1

  while (startIdx <= endIdx) {
    const midpoint = Math.floor((endIdx + startIdx) / 2)
    const midpointValue = allValues[midpoint]
    console.log(`midpoint: ${midpoint}, midpointValue: ${midpointValue}`)

    if (midpointValue === value) { return midpoint }

    if (midpointValue < value) { 
      startIdx = midpoint + 1
    } else {
      endIdx = midpoint - 1
    }
  }

  return null
}

export default binarySearch
