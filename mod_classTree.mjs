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
      // console.log(node.data + " is a Dupe!");
      return;
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
    else if (
      val === node.data &&
      (node.right !== null || node.left !== null) &&
      (node.right === null || node.left === null)
    ) {
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
        ? returnVal.push(callback(departingNode))
        : returnVal.push(departingNode.data);
    }
    return returnVal;
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
    if (root === null) return [];
    return [callback !== undefined ? callback(root) : root.data].concat(
      this.preOrder.call(this, callback, root.left),
      this.preOrder.call(this, callback, root.right)
    );
  };

  inOrder = (callback, root = this.root) => {
    if (root === null) return [];
    return [...this.inOrder.call(this, callback, root.left)].concat(
      callback !== undefined ? callback(root) : root.data,
      this.inOrder.call(this, callback, root.right)
    );
  };

  postOrder = (callback, root = this.root) => {
    if (root === null) return [];
    return [...this.postOrder.call(this, callback, root.left)].concat(
      this.postOrder.call(this, callback, root.right),
      callback !== undefined ? callback(root) : root.data
    );
  };

  //for traversal
  find2 = (val, node = this.root) => {
    if (val < node.data && node.left !== null) {
      return this.find2.call(this, val, node.left);
    } else if (val > node.data && node.right !== null) {
      return this.find2.call(this, val, node.right);
    } else if (val === node.data) {
      return node;
    } else {
      console.log("Value not Found");
      return false;
    }
  };

  height = (val) => {
    let rootNode;
    val === undefined
      ? (rootNode = this.root)
      : (rootNode = this.find2.call(this, val));
    if (rootNode === false) return;
    let value = 0;
    let recursion = (node) => {
      if (node === null) {
        return 0;
      } else if (node !== null) {
        let lSide = recursion(node.left);
        let rSide = recursion(node.right);
        if (lSide > rSide) {
          return lSide + 1;
        } else {
          return rSide + 1;
        }
      }
    };
    value = recursion(rootNode);
    console.log(value);
  };

  depth = (val, start = this.root) => {
    if (val === undefined) return "Parameter is missing";
    let recursion = (node, n) => {
      if (node === null) return;
      if (n === node.data) {
        return 0;
      } else {
        n < node.data ? (node = node.left) : (node = node.right);
        return recursion(node, n) + 1;
      }
    };
    let value = recursion(start, val);
    if (isNaN(value) === true) {
      return "Value Not Found";
    } else {
      return value;
    }
  };

  //unbalanced = node with 1 child node and grandchild(ren) or node with a child that is not a leaf node
  //traverse to singleChild node. Run height. if  absoluteValue(lSide - rSide) > 1, unbalanced
  isBalanced = () => {
    let balanced;
    let badNodes = [];

    let recursion = (node) => {
      if (node === null) {
        return;
      } else if (
        (node.right !== null || node.left !== null) &&
        (node.right === null || node.left === null)
      ) {
        let childNode = node.left || node.right;
        if (childNode.left !== null || childNode.right !== null) {
          balanced = false;
          badNodes.push(node.data);
        }
        return;
      } else {
        recursion(node.left);
        recursion(node.right);
      }
    };

    recursion(this.root);
    balanced === false
      ? console.log("Unbalanced:", badNodes)
      : console.log("Balanced");
    return balanced;
  };

  // isBalanced2 = (node = this.root) => {
  //   if (node === null) {
  //     return;
  //   } else if (
  //     (node.right !== null || node.left !== null) &&
  //     (node.right === null || node.left === null)
  //   ) {
  //     let childNode = node.left || node.right;
  //     if (childNode.left !== null || childNode.right !== null)
  //       console.log("Unbalanced @ number: " + node.data);
  //     return;
  //   } else {
  //     this.isBalanced.call(this, node.left);
  //     this.isBalanced.call(this, node.right);
  //   }
  // };

  rebalance = () => {
    let currentTree = this.inOrder.call();

    let buildTree2 = (array) => {
      let mid = Math.floor(array.length / 2);
      let left = array.splice(0, mid);
      let midVal = array.shift();
      let right = array;
      let node = new Node(midVal);
      node.left = this.buildTree.call(this, left);
      node.right = this.buildTree.call(this, right);
      return node;
    };

    this.root = buildTree2(currentTree);
    console.log("----------Tree rebalanced----------");
  };
}
