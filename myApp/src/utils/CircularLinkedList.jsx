class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class CircularLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	append(value) {
		const newNode = new Node(value);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
			newNode.next = this.head;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
			newNode.next = this.head;
		}
		this.length++;
	}
}

export default CircularLinkedList;
