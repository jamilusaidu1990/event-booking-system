class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Waitlist {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    enqueue(value) {
        const node = new Node(value);

        if (!this.tail) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        this.length++;
    }

    peek() {
        return this.head ? this.head.value : null;
    }

    dequeue() {
        if (!this.head) return null;

        const value = this.head.value;
        this.head = this.head.next;

        if (!this.head) {
            this.tail = null;
        }

        this.length--;
        return value;
    }

    get size() {
        return this.length;
    }
}

module.exports = { Waitlist };