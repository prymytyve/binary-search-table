import Node from "./mod_classNode.mjs";
import { handler } from "./mod_arrayHandler.mjs";

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree = (array) => {
    if (!array) return null;
    let arr = handler(array);
    if (arr.length <= 0) return null;
    let mid = Math.floor(arr.length / 2);
    let left = arr.splice(0, mid);
    let midVal = arr.shift();
    let right = arr;
    let node = new Node(midVal);
    node.left = this.buildTree.call(this, left);
    node.right = this.buildTree.call(this, right);
    return node;
  };

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    //courtesy of The Odin Project
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint.call(
        this,
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint.call(
        this,
        node.left,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  };

  insert = (val, node = this.root) => {
    if (val === node.data) {
      console.log("Beware of Dupes!");
    } else if (val < node.data) {
      node.left === null
        ? (node.left = new Node(val))
        : this.insert.call(this, val, node.left);
    } else if (val > node.data) {
      node.right === null
        ? (node.right = new Node(val))
        : this.insert.call(this, val, node.right);
    } else if (val === undefined || typeof val !== "number") {
      console.log("Missing value or incorrect value");
    }
  };

  next = (val, node) => {
    val < node.data ? (node = node.left) : (node = node.right);
    return node;
  };

  delete = (val, node = this.root, nodeParent) => {
    //node w/ 2 children...works for root too...............................................
    if (val === undefined) return;
    if (val === node.data && node.right !== null && node.left !== null) {
      let parent = node;
      let child = node.right;
      while (child.left !== null) {
        parent = child;
        child = child.left;
      }
      node._data = child.data;
      parent.left.data === child.data
        ? (parent.left = null)
        : (parent.right = null);
    } //node for parent w/ 1 child........................................................
    else if (val === node.data && (node.right !== null || node.left !== null)) {
      if (this.root.data === val) {
        let existingVal = undefined;
        this.root.left.data !== null
          ? (existingVal = this.root.left.data)
          : (existingVal = this.root.right.data);
        this.root._data = existingVal;
        this.root.left !== null
          ? (this.root.left = null)
          : (this.root.right = null);
      } else {
        let existingNode = undefined;
        node.left.data
          ? (existingNode = node.left)
          : (existingNode = node.right);
        nodeParent.left.data === val
          ? (nodeParent.left = existingNode)
          : (nodeParent.right = existingNode);
      }
    } //leaf node...........................................................................
    else if (val === node.data && node.right === null && node.left === null) {
      if (this.root.data === val) {
        this.root = null;
      } else {
        nodeParent.left.data === val
          ? (nodeParent.left = null)
          : (nodeParent.right = null);
      }
    }
    //recursion function....................................................................
    else if (val !== node.data) {
      let parent = node;
      let child = this.next.call(this, val, node);
      child !== null
        ? this.delete.call(this, val, child, parent)
        : console.log("Value not found");
    }
  };

  find = (val, node = this.root) => {
    if (val < node.data && node.left !== null) {
      return this.find.call(this, val, node.left);
    } else if (val > node.data && node.right !== null) {
      return this.find.call(this, val, node.right);
    } else if (val === node.data) {
      console.log(node);
    } else {
      console.log("Value not Found");
    }
  };

  levelOrder = (callback) => {
    if (this.root === null) return;
    let queue = [];
    let returnVal = [];
    queue.push(this.root);
    while (queue.length > 0) {
      let currentNode = queue[0];
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
      let departingNode = queue.shift();
      callback !== undefined
        ? callback(departingNode)
        : returnVal.push(departingNode.data);
    }
    if (callback === undefined) console.log(returnVal);
  };

  levelOrderRec = (callback) => {
    if (this.root === null) return;
    let queue = [this.root];
    let returnArr = [];

    let recursion = (q) => {
      if (!q.length) return;
      let currentNode = q[0];
      if (currentNode.left !== null) q.push(currentNode.left);
      if (currentNode.right !== null) q.push(currentNode.right);
      let departingNode = q.shift();
      callback !== undefined
        ? callback(departingNode)
        : returnArr.push(departingNode.data);
      recursion(q);
    };

    recursion(queue);
    if (callback === undefined) console.log(returnArr);
  };

  preOrder = (callback, root = this.root) => {
    if (callback === undefined) {
      if (root === null) return [];
      return [root.data].concat(
        this.preOrder.call(this, callback, root.left),
        this.preOrder.call(this, callback, root.right)
      );
    } else {
      if (root === null) return;
      callback(root);
      this.preOrder.call(this, callback, root.left);
      this.preOrder.call(this, callback, root.right);
    }
  };

  inOrder = (callback, root = this.root) => {
    if (callback === undefined) {
      if (root === null) return [];
      return [...this.inOrder.call(this, callback, root.left)].concat(
        root.data,
        this.inOrder.call(this, callback, root.right)
      );
    } else {
      if (root === null) return;
      this.inOrder.call(this, callback, root.left);
      callback(root);
      this.inOrder.call(this, callback, root.right);
    }
  };

  postOrder = (callback, root = this.root) => {
    if (callback === undefined) {
      if (root === null) return [];
      return this.postOrder
        .call(this, callback, root.left)
        .concat(this.postOrder.call(this, callback, root.right), root.data);
    } else {
      if (root === null) return;
      this.postOrder.call(this, callback, root.left);
      this.postOrder.call(this, callback, root.right);
      callback(root);
    }
  };
}
