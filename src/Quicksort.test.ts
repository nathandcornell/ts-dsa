import quicksort from './Quicksort'

describe('quicksort()', () => {
  let counter = -50000
  const sortedValues = Array.from({length: 100000}, () => counter++)
  const unsortedValues = [...sortedValues]
  // Randomize the order
  unsortedValues.sort(() => Math.floor(Math.random() * (2 - -1) + -1))
  const comparator = (a: number, b: number) => a - b

  const quicksortedValues = quicksort(unsortedValues, comparator)

  it.each(sortedValues.slice(0, 11))('It sorts %i into the expected position', (value) => {
    const expectedIdx = value + 50000
    expect(quicksortedValues[expectedIdx]).toEqual(value)
  })

  it.each(sortedValues.slice(50000, 50011))('It sorts %i into the expected position', (value) => {
    const expectedIdx = value + 50000
    expect(quicksortedValues[expectedIdx]).toEqual(value)
  })

  it.each(sortedValues.slice(99990))('It sorts %i into the expected position', (value) => {
    const expectedIdx = value + 50000
    expect(quicksortedValues[expectedIdx]).toEqual(value)
  })
})
