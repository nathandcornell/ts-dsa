import { BinaryTree } from './BinaryTree'

describe('binarySearch()', () => {
  const values = [123, 101, 22, 8, 923, 5, 29, 50, 1, 999]
  const compare = (a: number, b: number): number => a - b

  describe('add()', () => {
    it('adds the root node first', () => {
      const tree = new BinaryTree<number>(compare)
      tree.add(values[0])

      expect(tree.root()).not.toBeNull()
      expect(tree.root()?.value).toEqual(values[0])
    })

    it('retains the root after addional nodes are added', () => {
      const tree = new BinaryTree<number>(compare)
      tree.add(values[0])
      expect(tree.root()?.value).toEqual(values[0])
      tree.add(values[1])
      expect(tree.root()?.value).toEqual(values[0])
    })

    it('adds node in the expected order', () => {
      const tree = new BinaryTree<number>(compare)

      for (const value of values) {
        tree.add(value)
      }

      const root = tree.root()

      expect(root?.left?.value).toEqual(101)
      expect(root?.right?.value).toEqual(923)
      expect(root?.left?.left?.value).toEqual(22)
      expect(root?.left?.right).toBeNull()
      expect(root?.right?.value).toEqual(923)
      expect(root?.right?.right?.value).toEqual(999)
      expect(root?.right?.left).toBeNull()
    })
  })

  describe('min()', () => {
    const tree = new BinaryTree<number>(compare)

    for (const value of values) {
      if (value === 1) { break }

      tree.add(value)
    }

    it('returns the minimum added so far', () => {
      expect(tree.min()?.value).toEqual(5);
    })

    it('returns the new minimum once added', () => {
      tree.add(1)
      expect(tree.min()?.value).toEqual(1);
    })
  })

  describe('max()', () => {
    const tree = new BinaryTree<number>(compare)

    for (const value of values) {
      if (value === 999) { break }

      tree.add(value)
    }

    it('returns the maximum value added so far', () => {
      expect(tree.max()?.value).toEqual(923);
    })

    it('returns the new maximum once added', () => {
      tree.add(999)
      expect(tree.max()?.value).toEqual(999);
    })
  })

  describe('search()', () => {
    const tree = new BinaryTree<number>(compare)

    for (const value of values) {
      tree.add(value)
    }

    describe('when the search value exists in the tree', () => {
      const value = values[5]

      it('returns the node', () => {
        expect(tree.search(value)?.value).toEqual(value)
      })
    })

    describe('when the search value does not exist in the tree', () => {
      const value = 1000

      it('returns the node', () => {
        expect(tree.search(value)).toBeNull()
      })
    })
  })

  describe('remove()', () => {
    describe('when removing the root node', () => {
      const tree = new BinaryTree<number>(compare)

      for (const value of values) {
        tree.add(value)
      }

      it('the root is no longer found', () => {
        const oldRoot = tree.root()

        if (oldRoot === null) { fail('node not found') }

        const oldRootVal = oldRoot.value

        expect(tree.root()?.value).toEqual(oldRootVal)
        tree.remove(oldRootVal)
        expect(tree.search(oldRootVal)).toBeNull()
      })

      it('the root changes', () => {
        const oldRoot = tree.root()

        if (oldRoot === null) { fail('node not found') }

        const rightChild = oldRoot.right

        if (rightChild === null) { fail('child not found') }

        expect(tree.root()?.value).toEqual(oldRoot.value)
        tree.remove(oldRoot.value)
        expect(tree.root()?.value).toEqual(rightChild.value)
      })
    })

    describe('when removing a leaf node', () => {
      const tree = new BinaryTree<number>(compare)

      for (const value of values) {
        tree.add(value)
      }

      it('the node is no longer found', () => {
        expect(tree.search(1)?.value).toEqual(1)
        tree.remove(1)
        expect(tree.search(1)).toBeNull()
      })
    })

    describe('when removing a node with two children', () => {
      const tree = new BinaryTree<number>(compare)

      for (const value of values) {
        tree.add(value)
      }

      const node = tree.search(22)

      if (node === null) { fail('node not found') }

      const leftChild = node.left
      const rightChild = node.right

      if (leftChild === null || rightChild === null) { fail('child not found') }

      tree.remove(22)

      it('the node is no longer found', () => {
        expect(tree.search(22)).toBeNull()
      })

      it('the left child is still found', () => {
        expect(tree.search(leftChild.value)).not.toBeNull()
      })

      it('the right child is still found', () => {
        expect(tree.search(rightChild.value)).not.toBeNull()
      })
    })

    describe('when removing a node with one child', () => {
      const tree = new BinaryTree<number>(compare)

      for (const value of values) {
        tree.add(value)
      }

      const node = tree.search(923)

      if (node === null) { fail('node not found') }

      const rightChild = node?.right

      if (rightChild === null) { fail('child not found') }

      tree.remove(923)

      it('the node is no longer found', () => {
        expect(tree.search(923)).toBeNull()
      })

      it('the child is still found', () => {
        expect(tree.search(rightChild.value)).not.toBeNull()
      })
    })
  })
})
