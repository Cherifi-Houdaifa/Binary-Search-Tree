const Tree = require("./tree");

const getRandomNumbers = (n) => {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
};
let randomNumbers = getRandomNumbers(10);
// make sure there are no duplicates
randomNumbers = [...new Set(randomNumbers)];
const binarySearchTree = new Tree(randomNumbers);

console.log(`Balanced: ${binarySearchTree.isBalanced()}`);

console.log(`Level Order: ${binarySearchTree.levelOrder()}`);
console.log(`Pre Order: ${binarySearchTree.preorder()}`);
console.log(`Post Order: ${binarySearchTree.postorder()}`);
console.log(`In Order: ${binarySearchTree.inorder()}`);


for (let i = 0; i < 100; i++) {
    binarySearchTree.insert(Math.floor(Math.random() * 100));
}

console.log(`Balanced: ${binarySearchTree.isBalanced()}`);
binarySearchTree.reBalance()
console.log(`Balanced: ${binarySearchTree.isBalanced()}`);

console.log(`Level Order: ${binarySearchTree.levelOrder()}`);
console.log(`Pre Order: ${binarySearchTree.preorder()}`);
console.log(`Post Order: ${binarySearchTree.postorder()}`);
console.log(`In Order: ${binarySearchTree.inorder()}`);