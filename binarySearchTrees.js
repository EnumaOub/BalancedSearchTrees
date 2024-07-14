
const prettyPrint = (node, prefix = "", isLeft = true) => {
    console.log(node)
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    };
};

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    };

    buildTree(array) {
        if (array.length <= 1) {
            return null;
        }
        else {
            array = [...new Set(array)];
            array.sort(function(a, b){return a - b});


            const m = Math.floor(array.length / 2);
            const node = new Node(array[m]);
            node.left = this.buildTree(array.slice(0, m));
            node.right = this.buildTree(array.slice(m, array.length));

            return node;
        }
        
    };

    showNode(node) {
        prettyPrint(node);
    }

    insert(value) {
        return this.insertNode(value, this.root)
    };

    insertNode(value, node) {
        if (!node) {
            return new Node(value);
        }
        if (value < node.data) {
            node.left = this.insertNode(value, node.left);
        }
        else if (value > node.data) {
            node.right = this.insertNode(value, node.right);
        }
        return node;
    };

    deleteItem(value) {
        return this.deleteNode(value, this.root)
    };

    deleteNode(value, node) {
        if (!node) {
            return node;
        }
        if (value < node.data) {
            node.left = this.deleteNode(value, node.left);
        }
        else if (value > node.data) {
            node.right = this.deleteNode(value, node.right);
        }
        else if (value === node.data) {
            if (node.left === null) {
                return node.right;
            }
            else if (node.right === null) {
                return node.left;
            }
            else {
                node.data = this.minValue(node.right);
                node.right = this.deleteNode(node.data, node.right);
            }
        }
        return node;
    };

    minValue(node) {
        let minVal = node.data;
        while (node.letf) {
            minVal = node.left.data;
            node = node.left;
        }
        return minVal;
    };

    find(value) {
        return this.findeNode(value, this.root)
    };

    findeNode(value, node) {
        if (!node || value === node.data) {
            return node;
        }
        if (value < node.data) {
            return this.findeNode(value, node.left);
        }
        else if (value > node.data) {
            return this.findeNode(value, node.right);
        }
    };

    levelOrder(callback=null) {
        let queue = [];
        let data = [];
        let nodeC = this.root;
        queue.push(nodeC);
        while (queue.length > 0) {
            data.push(nodeC);
            queue.splice(0,1);
            if (nodeC.left) {
                queue.push(nodeC.left);
            }
            if (nodeC.right) {
                queue.push(nodeC.right);
            }
            nodeC = queue[0];
            
        }
        if (callback) {
            return callback(data);
        }
        else {
            return data;
        }
    };

    inOrder(callback=null) {
        const data = this.inOrderNode(this.root);
        if (callback) {
            return callback(data);
        }
        else {
            return data;
        } 
    };

    inOrderNode(node, data = []) {
        if (node) {
            this.inOrderNode(node.left, data);
            data.push(node);
            this.inOrderNode(node.right, data);
        }
        else {
            return;
        }
        return data;
    };

    preOrder(callback=null) {
        const data = this.preOrderNode(this.root);
        if (callback) {
            return callback(data);
        }
        else {
            return data;
        } 
    };

    preOrderNode(node, data = []) {
        if (node) {
            data.push(node);
            this.preOrderNode(node.left, data);
            this.preOrderNode(node.right, data);
        }
        else {
            return;
        }
        return data;
    };

    postOrder(callback=null) {
        const data = this.postOrderNode(this.root);
        if (callback) {
            return callback(data);
        }
        else {
            return data;
        } 
    };

    postOrderNode(node, data = []) {
        if (node) {
            this.preOrderNode(node.left, data);
            this.preOrderNode(node.right, data);
            data.push(node);
        }
        else {
            return;
        }
        return data;
    };

    height(node = this.root) {
        if (node) {
            let heightL = this.height(node.left);
            let heightR = this.height(node.right);
            if (heightL - heightR > 1) {
                return -1;
            }
            else {
                return Math.max(heightL, heightR) + 1;
            }
            
        }
        else {
            return 0;
        }
        
    };

    depth(node, root = this.root, depth = 0) {
        if (root) {
            if (node.data < root.data) {
                return this.depth(node, root.left, depth + 1);
            }
            else if (node.data > root.data) {
                return this.depth(node, root.right, depth + 1);
            }
            else if (root.data === node.data ) {
                return depth;
            }
        }
        else {
            return 0;
        }
    };

    isBalanced() {
        if (this.root) {
            let heightL = this.height(this.root.left);
            let heightR = this.height(this.root.right);
            const diffLR = Math.abs(heightL - heightR);

            return (!(diffLR > 1 || heightL === -1 || heightR === -1 ))
        }
        else {
            return true;
        }
    };

    rebalance() {
        this.root = this.buildTree(this.inOrder(this.getValueNode));
        return this.root;
    };

    getValueNode(array) {
        array.forEach(function(item, index) {
            this[index] = item.data;
          }, array);
        return array
    };
    
};


// const BST = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// console.log("Initial DATA : \n")
// BST.showNode(BST.root)

// BST.insert(25);
// console.log("\nInsert 25 DATA : \n")
// BST.showNode(BST.root)

// BST.insert(5555);
// console.log("\nInsert 5555 DATA : \n")
// BST.showNode(BST.root)

// BST.deleteItem(23);
// console.log("\nDelete 23 DATA : \n")
// BST.showNode(BST.root)

// console.log("\nFIND 25 Node : \n")
// console.log(BST.find(25))

// console.log("\nTest levelOrder : \n")
// console.log(BST.levelOrder())

// console.log("\nTest inOrder : \n")
// console.log(BST.inOrder())

// console.log("\nTest preOrder : \n")
// console.log(BST.preOrder())

// console.log("\nTest postOrder : \n")
// console.log(BST.postOrder())

// console.log("\nTest Height : \n")
// console.log(BST.height())

// console.log("\nTest Height node root.right.right  : \n")
// console.log(BST.height(BST.root.right.right))

// console.log("\nTest Depth node root.left : \n")
// console.log(BST.depth(BST.root.left))

// console.log("\nTest Depth node root.right.right  : \n")
// console.log(BST.depth(BST.root.right.right))


const BST = new Tree(Array.from({length: 10}, () => Math.floor(Math.random() * 100)));

console.log("Initial DATA : \n")
BST.showNode(BST.root)

console.log("\nTest Balance  : \n")
console.log(BST.isBalanced())

for (i=0; i<15; i++) {
    BST.insert(Math.floor(Math.random() * 100));
};

console.log("\nTest Balance after adding numbers : \n")
console.log(BST.isBalanced())

console.log("\nTest Rebalance : \n")
console.log(BST.rebalance())
console.log("\nTest Balance  : \n")
console.log(BST.isBalanced())


console.log("\nTest levelOrder : \n")
console.log(BST.levelOrder())

console.log("\nTest inOrder : \n")
console.log(BST.inOrder())

console.log("\nTest preOrder : \n")
console.log(BST.preOrder())

console.log("\nTest postOrder : \n")
console.log(BST.postOrder())