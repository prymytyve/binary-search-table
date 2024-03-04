import Tree from "./mod_classTree.mjs";

const array = [21, 6513, 5, 33, 1, 5, 2, 4, 3, 1000, 7, 51, 6, 0];
// const array1 = [2, 6, 7];
// const array2 = [6, 3];
// const array = [6];
const test = new Tree(array);

// test.insert(8);
// test.delete();
test.prettyPrint();
// test.find(6);
// test.levelOrder();
// test.levelOrder(callbackFunc);
// test.levelOrderRec();
// test.levelOrderRec(callbackFunc);
// console.log(test.preOrder());
// test.preOrder(callbackFunc);
// console.log(test.inOrder());
// test.inOrder(callbackFunc);
// console.log(test.postOrder());
// test.postOrder(callbackFunc);
test.height();

///////////////Misc functions////////////////////////
function callbackFunc(node) {
  console.log(node.data * 2);
}
