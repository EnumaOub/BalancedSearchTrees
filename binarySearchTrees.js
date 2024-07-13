
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

    };

    deleteItem(value) {

    };
};


const BST = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

BST.showNode(BST.root)