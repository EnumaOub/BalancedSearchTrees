
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
        else if (value === node.data) {
            return;
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

    
};


const BST = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log("Initial DATA : \n")
BST.showNode(BST.root)

BST.insert(25);
console.log("\nInsert 25 DATA : \n")
BST.showNode(BST.root)

BST.insert(5555);
console.log("\nInsert 5555 DATA : \n")
BST.showNode(BST.root)

BST.deleteItem(23);
console.log("\nDelete 23 DATA : \n")
BST.showNode(BST.root)

console.log("\nFIND 25 Node : \n")
console.log(BST.find(25))

console.log("\nTest levelOrder : \n")
console.log(BST.levelOrder())