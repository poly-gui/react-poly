interface LinkedListNode<T> {
	value: T
	next: LinkedListNode<T> | null
}

class LinkedList<T> {
	private _length = 0
	private first: LinkedListNode<T> | null = null
	private last: LinkedListNode<T> | null = null

	public get length() {
		return this._length
	}

	public append(value: T) {
		const newNode: LinkedListNode<T> = {
			value,
			next: null,
		}
		if (this.first && this.last) {
			this.last.next = newNode
			this.last = newNode
		} else {
			this.first = newNode
			this.last = newNode
		}
		this._length++
	}

	public insertBefore(beforeValue: T, value: T): number {
		if (!this.first || !this.last) {
			return -1
		}

		if (this.first.value === beforeValue) {
			this.first = {
				value,
				next: this.first,
			}
			return 0
		}

		let current: LinkedListNode<T> | null = this.first
		let i = 0
		while (current) {
			if (current.next === beforeValue) {
				const node: LinkedListNode<T> = {
					value,
					next: current.next,
				}
				current.next = node
				return i
			}
			i++
			current = current.next
		}
		return -1
	}

	public findIndex(element: T): number {
		let i = 0
		for (const item of this) {
			if (item === element) {
				return i
			}
			i++
		}
		return -1
	}

	*[Symbol.iterator]() {
		let current = this.first
		while (current) {
			yield current.value
			current = current.next
		}
	}
}

export { LinkedList }
export type { LinkedListNode }
