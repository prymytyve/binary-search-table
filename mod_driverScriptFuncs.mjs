export const rng = (numOfData, min, max) => {
  let arr = [];
  if (numOfData === undefined) numOfData = Math.floor(Math.random() * 100) + 10;
  for (let i = 0; i < numOfData; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
};

export const printOrders = (tree, callbackFunc) => {
  console.log("levelOrder: " + tree.levelOrder());
  if (callbackFunc)
    console.log("└── callBack: " + tree.levelOrder(callbackFunc));
  console.log("preOrder: " + tree.preOrder());
  if (callbackFunc) console.log("└── callBack: " + tree.preOrder(callbackFunc));
  console.log("postOrder: " + tree.postOrder());
  if (callbackFunc)
    console.log("└── callBack: " + tree.postOrder(callbackFunc));
  console.log("inOrder: " + tree.inOrder());
  if (callbackFunc) console.log("└── callBack: " + tree.inOrder(callbackFunc));
};
