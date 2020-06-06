import Document_Node from './Document_Node.js'
export default class Non_Leaf_Node extends Document_Node {
    /**
     * sets the child behaviors on its current behavior 
     */
    update() {
        console.warn("IMPLEMENT METHOD ON SUBCLASS", this)
    }


}