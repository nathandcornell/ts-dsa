type Comparator<T> = (a: T, b: T) => number

const mergesort = <T>(values: T[], compare: Comparator<T>): T[] => {
  if (values.length === 1) { return values }

  const midpoint = Math.floor(values.length / 2)

  const sub1 = mergesort(values.slice(0, midpoint), compare)
  const sub2 = mergesort(values.slice(midpoint), compare)
  const sorted = []

  let ptr1 = 0
  let ptr2 = 0

  while (ptr1 < sub1.length && ptr2 < sub2.length) {
    const val1 = sub1[ptr1]
    const val2 = sub2[ptr2]

    if (compare(val1, val2) < 0) {
      sorted.push(val1)
      ptr1++
    } else {
      sorted.push(val2)
      ptr2++
    }
  }

  while (ptr1 < sub1.length) {
    sorted.push(sub1[ptr1])
    ptr1++
  }

  while (ptr2 < sub2.length) {
    sorted.push(sub2[ptr2])
    ptr2++
  }

  return sorted
}

export default mergesort
