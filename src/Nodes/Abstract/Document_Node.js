export default class Document_Node {
    _parent;
    _behavior;
    constructor(behavior) {
        this._behavior = behavior;
    }
    get behavior() {
        return this._behavior;
    }
    set parent(p) {
        this._parent = p;
    }

}