import Document_Node from '../../Abstract/Document_Node.js';
/** @typedef {import('./Glyph_Behavior.js').default} Glyph_Behavior*/
/**
 * @class
 */
export default class Glyph_Node extends Document_Node {
  /**
   * @param {Glyph_Behavior} glyphBehavior
   */
  constructor(glyphBehavior) {
    super(glyphBehavior);
  }
}
