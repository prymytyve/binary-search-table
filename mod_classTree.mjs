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

  insertFail = (val) => {
    let temp = this.root;
    while (temp !== null) {
      if (val < temp.data) {
        temp = temp.left;
      } else if (val > temp.data) {
        temp = temp.right;
      } else if (val === temp.data) {
        console.log("Dupes are not permitted!");
        return;
      }
    }
    temp = new Node(val);
  };

  // insert = (val, node = this.root) => {
  //   if (node === null) {
  //     node = new Node(val);
  //   } else if (val === node.data) {
  //     console.log("Beware of Dupes!");
  //   } else {
  //     let temp;
  //     val < node.data ? (temp = node.left) : (temp = node.right);
  //     this.insert.call(this, val, temp);
  //   }
  // };

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
}
