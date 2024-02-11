import Node from "./mod_classNode.mjs";
import { handler } from "./mod_arrayHandler.mjs";

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree = (array) => {
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
}
