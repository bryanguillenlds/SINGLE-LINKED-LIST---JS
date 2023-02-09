class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  //method to APPEND a node to the end
  push(val) {
    //create new node
    let newNode = new Node(val);

    //if the list is empty and this is the very first item...
    if (!this.head) {
      this.head = newNode; //make new node the head
      this.tail = this.head; //make it be the tail too
    } else {
      //if we're not pushing the very first item...
      this.tail.next = newNode; //add new node after current tail
      this.tail = newNode; //make the new node be the tail
    }

    this.length++; //increment length

    return this; //return the whole list
  }

  //method to traverse through list
  traverse() {
    let current = this.head; //start at head

    //loop through list while there are nodes to traverse
    while(current) {
      current = current.next; //move to next one
    }
  }

  pop() {
    //if list is empty...
    if (!this.length) return undefined;

    let current = this.head; //where to start the iteration
    //to keep track of the item immediately before the tail that will be popped
    let newTail = current;
    
    //loop thorugh list while there is something
    while(current.next) {
      //advance new tail to be current
      newTail = current;
      //advance current to be the next item
      current = current.next;
    }

    //make tail be the newtail value that was being tracked
    //which will always be the item before the one being popped
    this.tail = newTail;
    //make the (new) tail point to null
    this.tail.next = null;
    //decrement length of list
    this.length--;

    //if we are popping the very last item...
    if (this.length === 0) {
      //set everything to null
      this.head = null;
      this.tail = null;
    }
    
    return current; //return what was popped
  }

  //method to remove the head
  shift() {
    //if empty list, return undefined
    if (!this.length) return undefined;
    
    let currentHead = this.head; //store reference to current head temporarily
    this.head = this.currentHead.next; //make next item the new head
    this.length--; //decrement length of list

    //if we are popping the very last item...
    if (this.length === 0) {
      //set everything to null
      this.head = null;
      this.tail = null;
    }
    
    return currentHead; //return the removed head
  }

  //method to PREpend a new node to the begininng of the list
  unshift(val) {
    let newNode = new Node(val);

    //if there is no head and this is the very first item...
    if (!this.head) {
      this.head = newNode; //make new node the head
      this.tail = this.head; //make it be the tail too
    } else {
      //if there was a head already...
      newNode.next = this.head; //point the new node next prop to the current/old head
      this.head = newNode; //update the head to be the new node
    }

    //increment length
    this.length++;

    return this;
  }

  //method to get a node byh it's position in the list
  get(index) {
    //if the index is negative or out of bounds, return null
    if (index < 0 || index >= this.length) return null;

    //counter to keep track of where we are in the iteration
    let counter = 0;
    //where to start iterating
    let current = this.head;

    //iterate through list until we find the counter matches the index
    while(counter !== index) {
      current = current.next; //go to next node
      counter++;//increment counter so it increases as we move
    }

    return current; //return the node that matched
  }

  //a method to change/update the value of a node based on the index passed
  set(index, val) {
    let foundNode = get(index); //ge the node to be updated

    if (foundNode) {
      foundNode.val = val; //update the value
      return true; //return
    }

    return false; //return false if not found
  }

  //Method to insert a node intoa  specific position
  insert(index, val) {
    //if index is less than 0 or less greater (not equal) than length...
    if (index < 0 || index > this.length) return false;
    
    //if the index is the last one, we can just use push
    if (index === this.length) {
      this.push(val);
      return true;
    }

    //if the index is the first one, we can prepend using unshift
    if (index === 0) {
      this.unshift(val);
      return true;
    }

    //create new node
    let newNode = new Node(val);

    //if it's neither the last, nor the first...
    //if it's someone in between, then:    
    //get the node that's before the position where we want to insert
    let prevNode = this.get(index-1);
    let nextNode = prevNode.next; //store a reference to the node after the found node
    prevNode.next = newNode; //make foundnode point to new node
    newNode.next = nextNode; //make new node point to former nextnode
    this.length++; //increment node
    return true; //return
  }

  //Method to remove a node from a specific position
  remove(index) {
    //if index is less than 0 or less greater (not equal) than length...
    if (index < 0 || index > this.length) return undefined;
    
    //if the index is the last one, we can just use pop
    if (index === this.length-1) {
      return this.pop();
    }

    //if the index is the first one, we can remove using shift
    if (index === 0) {
      return this.shift();
    }

    //if it's neither the last, nor the first...
    //if it's someone in between, then:    
    //get the node that's before the position where we want to insert
    let prevNode = this.get(index-1);
    let removed = prevNode.next; //grab ref for node that'll be removedb b4 removing
    prevNode.next = removed.next; //make it point to the subsequent node
    this.length--; //decrement length

    return removed; //return the value
  }

  //method to reverse a linked list
  reverse() {
    let node = this.head; //store a reference to current/old head
    this.head = this.tail; //make head be new tail
    this.tail = node; //make tail be head
    let next = null; //to eventually store the next prop while iterating
    let prev = null; //to eventually store the prev prop while iterating

    //loop through list
    for (let i = 0; i < this.length; i++) {
      //store the next node of the current node
      next = node.next;
      //make current node point to previous node
      node.next = prev;

      //move both prev and next one over
      prev = node; //now previous is the current node
      node = next; //and we move over the current node to the next
    }

    return this;
  }

  //method to print/log a list
  print() {
    let arr = [];
    let current = this.head;

    while (current) {
      arr.push(current.val);
      current = current.next;
    }

    console.log(arr);
  }
}