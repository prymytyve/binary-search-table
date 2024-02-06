import Node from "./mod_classNode.mjs";

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree = (arr) => {
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
}