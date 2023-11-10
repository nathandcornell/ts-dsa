type Comparator<T> = (a: T, b: T) => number

class Heap<T> {
  private heap: T[] = [];
  private compare: Comparator<T>;

  public constructor(compare: Comparator<T>) {
    this.compare = compare
  }

  public push(element: T): void {
    this.heap.push(element)
    this.bubbleUp(this.heap.length - 1)
  }

  public pop(): T | null {
    if (this.heap.length < 1) { return null }
    if (this.heap.length === 1) { return this.heap.pop() || null }

    const head = this.heap[0]
    const tail = this.heap.pop() || null

    if (tail === null) { return head }

    this.heap[0] = tail

    this.bubbleDown(0)

    return head
  }

  public peek(): T|null {
    if (this.heap.length < 1) { return null }

    return this.heap[0]
  }

  public size(): number {
    return this.heap.length
  }

  private bubbleDown(idx: number): void {
    if (idx >= this.heap.length - 1) { return }

    const childIdx = this.minChildIndex(idx);

    if (childIdx === null) { return }

    const value = this.heap[idx]
    const childValue = this.heap[childIdx]

    if (this.compare(value, childValue) < 1) { return }

    this.swap(idx, childIdx)
    this.bubbleDown(childIdx)
  }

  private bubbleUp(idx: number): void {
    if (idx === 0) { return }

    const parentIdx = this.parentIndex(idx)

    if (parentIdx === null) { return }

    const value = this.heap[idx]
    const parentValue = this.heap[parentIdx]

    if (this.compare(value, parentValue) >= 1) { return }

    this.swap(idx, parentIdx)
    this.bubbleUp(parentIdx)
  }

  private minChildIndex(idx: number): number | null {
    const size = this.heap.length

    if (idx >= size - 1) { return null }

    const leftIdx = idx * 2 + 1
    const rightIdx = leftIdx + 1

    if (leftIdx >= size && rightIdx > size) { return null }

    const leftValue = this.heap[leftIdx]
    const rightValue = this.heap[rightIdx]

    if (rightIdx < size && this.compare(rightValue, leftValue) < 1) { return rightIdx }

    return leftIdx
  }

  private parentIndex(idx: number): number | null {
    const parentIdx = Math.floor((idx - 1) / 2)

    if (parentIdx < 0) { return null }

    return parentIdx
  }

  private swap(idxA: number, idxB: number): void {
    [this.heap[idxA], this.heap[idxB]] = [this.heap[idxB], this.heap[idxA]]
  }
}

export default Heap
