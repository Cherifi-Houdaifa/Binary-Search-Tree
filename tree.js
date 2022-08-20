class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function buildTree(arr, start, end) {
    if (start > end) {
        return null;
    }
    arr = [...new Set(arr)];
    arr.sort();
    const mid = parseInt((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);

    return node;
}

class Tree {
    constructor(arr) {
        this.root = buildTree(arr, 0, arr.length - 1);
    }

    insert(value, node = this.root) {
        if (node == null) {
            node = new Node(value);
            return node;
        }
        if (value < node.data) {
            // left
            node.left = this.insert(value, node.left);
        } else if (value > node.data) {
            // right
            node.right = this.insert(value, node.right);
        }
        return node;
    }
    delete(value, node = this.root) {
        if (node === null) {
            return node;
        }
        if (value < node.data) {
            // left
            node.left = this.delete(value, node.left);
        } else if (value > node.data) {
            // right
            node.right = this.delete(value, node.right);
        } else {
            // node with no child
            if (node.right === null && node.left === null) {
                return null;
            }
            // node with one child
            else if (node.right === null) {
                return node.left;
            } else if (node.left === null) {
                return node.right;
            }
            // node with two childs
            else {
                node.data = this.getInorderSuc(node.right);
                node.right = this.delete(node.data, node.right);
            }
        }
        return node;
    }
    getInorderSuc(node) {
        let suc = node.data;
        while (node.left !== null) {
            suc = node.left.data;
            node = node.left;
        }
        return suc;
    }
    find(value, node = this.root) {
        if (node === null) {
            return null;
        }
        if (value < node.data) {
            // left
            return this.find(value, node.left);
        } else if (value > node.data) {
            // right
            return this.find(value, node.right);
        } else {
            return node;
        }
    }
    levelOrder(cb = null, node = this.root) {
        if (node === null) return;
        let arr = [];
        let queue = [];
        queue.push(node);
        while (queue.length != 0) {
            const currentNode = queue[0];
            if (cb === null) {
                arr.push(currentNode.data);
            } else {
                cb(currentNode);
            }
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
            queue.shift();
        }
        if (cb === null) {
            return arr;
        }
    }
    preorder(cb = null, node = this.root) {
        // root left right
        if (node === null) {
            return;
        }
        let arr = [];
        if (cb !== null) {
            cb(node);
        } else {
            arr.push(node.data);
        }
        arr = arr.concat(this.preorder(cb, node.left));
        arr = arr.concat(this.preorder(cb, node.right));
        // remove all undefined from the array
        arr = arr.filter((x) => {
            return x !== undefined;
        });
        return arr;
    }
    inorder(cb = null, node = this.root) {
        // left root right

        if (node === null) {
            return;
        }
        let arr = [];
        arr = arr.concat(this.preorder(cb, node.left));
        if (cb !== null) {
            cb(node);
        } else {
            arr.push(node.data);
        }
        arr = arr.concat(this.preorder(cb, node.right));
        // remove all undefined from the array
        arr = arr.filter((x) => {
            return x !== undefined;
        });
        return arr;
    }
    postorder(cb = null, node = this.root) {
        // left right root

        if (node === null) {
            return;
        }
        let arr = [];
        arr = arr.concat(this.preorder(cb, node.left));
        arr = arr.concat(this.preorder(cb, node.right));
        if (cb !== null) {
            cb(node);
        } else {
            arr.push(node.data);
        }
        // remove all undefined from the array
        arr = arr.filter((x) => {
            return x !== undefined;
        });
        return arr;
    }
    height(node = this.root) {
        if (node === null) {
            return -1;
        }
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
    depth(node, root = this.root) {
        // Base case
        if (root == null) return -1;

        // Initialize distance as -1
        var dist = -1;

        // Check if x is current node=
        if (
            root == node ||
            // Otherwise, check if x is
            // present in the left subtree
            (dist = this.depth(node, root.left)) >= 0 ||
            // Otherwise, check if x is
            // present in the right subtree
            (dist = this.depth(node, root.right)) >= 0
        )
            // Return depth of the node
            return dist + 1;

        return dist;
    }
    isBalanced(node = this.root) {
        if (node === null) {
            return true;
        }

        let lh = this.height(node.left);
        let rh = this.height(node.right);

        if (
            Math.abs(lh - rh) <= 1 &&
            this.isBalanced(node.left) == true &&
            this.isBalanced(node.right) == true
        )
            return true;

        return false;
    }
    reBalance () {
        const array = this.preorder();
        this.root = buildTree(array, 0, array.length - 1);
    }
}

module.exports = Tree;