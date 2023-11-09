class Heap<T> {
  private heap: T[] = []
  private compare: (a: T, b: T) => number

  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare
  }

  public push(element: T): void {
    this.heap.push(element)
    this.bubbleUp(this.lastIdx())
  }

  public pop(): T | null {
    if (this.heap.length === 0) { return null }
    if (this.heap.length === 1) { return this.heap.pop() || null }

    const head = this.heap[0]
    const tail = this.heap.pop()

    if (tail === undefined) { return head }

    this.heap[0] = tail
    this.bubbleDown(0)

    return head
  }

  public peek(): T | null {
    return this.heap[0] || null
  }

  public size(): number {
    return this.heap.length
  }

  private lastIdx(): number {
    return this.heap.length - 1
  }

  private bubbleUp(idx: number): void {
    if (idx === 0) { return }

    // Find the parent, quit if none
    const parentIdx = this.parentIdx(idx)

    if (parentIdx === null) { return }

    // If comparator returns positive number, swap with parent
    const value = this.heap[idx]
    const parent = this.heap[parentIdx]
    const needsSwap = this.compare(value, parent) < 0

    if (!needsSwap) { return }

    this.swap(idx, parentIdx)

    // if swap happened, bubble up again
    this.bubbleUp(parentIdx)
  }

  private bubbleDown(idx: number): void {
    if (idx >= this.heap.length) { return }

    const childIdx = this.minChildIdx(idx)

    if (childIdx === null) { return }

    const childValue = this.heap[childIdx]
    const value = this.heap[idx]

    if (this.compare(value, childValue) < 0) { return }

    this.swap(idx, childIdx)

    this.bubbleDown(childIdx)
  }

  private swap(idxA: number, idxB: number): void {
    [this.heap[idxA], this.heap[idxB]] = [this.heap[idxB], this.heap[idxA]]
  }

  private parentIdx(idx: number): number | null {
    const pIdx = Math.floor((idx - 1) / 2)

    if (pIdx < 0) { return null }

    return pIdx
  }

  private leftChildIdx(idx: number): number | null {
    const childIdx = idx * 2 + 1

    if (childIdx >= this.heap.length) { return null }

    return childIdx
  }

  private rightChildIdx(idx: number): number | null {
    const childIdx = idx * 2 + 2

    if (childIdx >= this.heap.length) { return null }

    return childIdx
  }

  private minChildIdx(idx: number): number | null {
    if (idx >= this.heap.length) { return null }

    // Get child indexes:
    const leftChildIdx = this.leftChildIdx(idx)
    const rightChildIdx = this.rightChildIdx(idx)

    if (leftChildIdx === null && rightChildIdx === null) { return null }
    if (leftChildIdx === null) { return rightChildIdx }
    if (rightChildIdx === null) { return leftChildIdx }

    const leftChild = this.heap[leftChildIdx]
    const rightChild = this.heap[rightChildIdx]

    if (this.compare(leftChild, rightChild) > 0) { return rightChildIdx }

    return leftChildIdx
  }
}

export default Heap
