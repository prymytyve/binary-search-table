import Tree from "./mod_classTree.mjs";
import { rng, printOrders } from "./mod_driverScriptFuncs.mjs";

//Driver Script
function driverScript(numOfData, numOfDataToAdd, callback, min = 1, max = 250) {
  //step 1: creates tree
  let initArr = rng(numOfData, min, max);
  const tree = new Tree(initArr);

  //step 2: balance check
  tree.isBalanced();

  //step 3: print orders
  printOrders(tree, callback);

  //step 4: insert data
  let arr2 = rng(numOfDataToAdd, min, max);
  arr2.forEach((data) => tree.insert(data));

  //step 5: balance check
  let balanceCheck = tree.isBalanced();

  //step 6: rebalance if unbalanced
  if (balanceCheck === false) tree.rebalance(); //step 7: balance check
  tree.isBalanced();

  //step 8: order print
  printOrders(tree, callback);
  return tree;
}

//////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

let tree1 = driverScript(15, 10, callbackFunc);
tree1.prettyPrint();

///////////////Misc functions////////////////////////
function callbackFunc(node) {
  return node.data * 2;
}
