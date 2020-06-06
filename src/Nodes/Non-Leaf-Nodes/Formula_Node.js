import Document_Node from "../Document_Node.js";
import Non_Leaf_Node from "../Non_Leaf_Node.js";

export default class Formula_Node extends Non_Leaf_Node {


    constructor(formulaBehavior) {
        super(formulaBehavior);
        /**
         * List of descendants from left to right
         */
        this._elements = [];
    }

    update() {
        this._behavior.elements = this._elements.map((element) => {
            element.behavior;
        })
    }


    /**
     * add Document Node to end of elements
     * @param {Document_Node} node node to be pushed
     */
    push(node) {
        /**
         * _elements.push(node)
         *this.update() 
         */
    }



}