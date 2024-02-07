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

  prettyPrint = (node, prefix = "", isLeft = true) => {
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
  // insert = (value) => {};
  // delete = (value) => {};
}
