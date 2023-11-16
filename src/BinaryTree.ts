type Comparator<T> = (a: T, b: T) => number

class TreeNode<T> {
  public value: T
  public left: TreeNode<T> | null
  public right: TreeNode<T> | null

  constructor(value: T) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BinaryTree<T> {
  public rootNode: TreeNode<T> | null
  private compare: Comparator<T>

  constructor(compare: Comparator<T>) {
    this.compare = compare
    this.rootNode = null
  }

  public root = () => {
    return this.rootNode
  }

  public add = (value: T): TreeNode<T> | null => {
    const newNode = new TreeNode<T>(value)
    let current = this.rootNode
    let previous = null

    if (this.rootNode === null) {
      this.rootNode = newNode
      return newNode
    }

    while (current !== null) {
      const comparison = this.compare(value, current.value)

      if (comparison === 0) {
        console.error('Duplicate value - aborting add()')
        return this.rootNode
      }

      previous = current

      if (comparison < 0) {
        current = current.left
      } else {
        current = current.right
      }
    }

    if (previous === null) {
      this.rootNode = newNode
      return newNode
    }

    if (this.compare(newNode.value, previous.value) < 0) {
      previous.left = newNode
    } else {
      previous.right = newNode
    }

    return this.rootNode
  }

  public remove = (value: T): TreeNode<T> | null => {
    // Find the node
    let current = this.rootNode
    let previous = null

    if (this.rootNode === null) {
      return null
    }

    while (current !== null) {
      const comparison = this.compare(value, current.value)

      if (comparison === 0) {
        break;
      }

      previous = current

      if (comparison < 0) {
        current = current.left
      } else {
        current = current.right
      }
    }

    if (current === null) {
      return this.rootNode
    }

    if (this.compare(value, current.value) !== 0) {
      console.error('Node not found')
      return this.rootNode
    }

    // Handle leaf node
    if (current.left === null && current.right === null) {
      // We're at the root node
      if (previous === null) {
        this.rootNode === null
        return null
      }

      const isLeftChild = (this.compare(current.value, previous.value) < 0)

      if (isLeftChild) {
        previous.left = null
        return this.rootNode
      } else {
        previous.right = null
        return this.rootNode
      }
    }

    // Handle node with two children
    if (current.left !== null && current.right !== null) {
      // Find the successor node and parent
      let sParent = current
      let successor = current.right

      while (successor.left !== null) {
        sParent = successor
        successor = successor.left
      }

      // Set the successor parent child reference to null
      const successorIsLeftChild = sParent.left !== null && this.compare(sParent.left.value, successor.value) === 0

      if (successorIsLeftChild) {
        sParent.left = successor.right
      } else {
        sParent.right = successor.right
      }

      // Set the current value to the successor value
      current.value = successor.value

      // We're at the root node
      if (previous === null) {
        this.rootNode === successor
      }

      return this.rootNode
    }

    // Handle node with one child
    const childNode = current.left || current.right

    if (childNode === null) { return this.rootNode }

    // Set the current node value to the child value
    current.value = childNode.value
    // Set the current node left and right to the child left and right
    current.left = childNode.left
    current.right = childNode.right
    // The old child node is now orphaned

    return this.rootNode
  }

  public min = (): TreeNode<T> | null => {
    let current = this.rootNode
    let min = this.rootNode

    while (current !== null) {
      min = current
      current = min.left
    }

    return min
  }

  public max = (): TreeNode<T> | null => {
    let current = this.rootNode
    let max = this.rootNode

    while (current !== null) {
      max = current
      current = max.right
    }

    return max
  }

  public search = (value: T): TreeNode<T> | null => {
    let current = this.rootNode

    while (current !== null) {
      const comparison = this.compare(value, current.value)

      if (comparison === 0) { return current }

      if (comparison < 0) {
        current = current.left
      } else {
        current = current.right
      }
    }

    return null
  }
}

export { TreeNode, BinaryTree }
