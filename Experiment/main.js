import Formula from './Formula';
import Glyph from './Glyph';
import Scripts from './Scripts';

/**
 *
 */
export default function main() {
  const root = new Formula();
  const a = new Glyph('A');
  const b = new Glyph('B');
  const c = new Glyph('C');
  const a2 = new Glyph('A');
  const b2 = new Glyph('B');
  const c2 = new Glyph('C');
  const gfa = genGlyphFormula('A');
  const gfb = genGlyphFormula('B');
  const gfc = genGlyphFormula('C');
  const sABC2 = genScripts(a2, b2, c2);
  const sABC = genScripts(a, sABC2, c);
  root.push(new Glyph('TEST'), gfa, sABC, gfb, gfc);
  const nested = new Formula();
  nested.push(gfc);
  root.push(nested);
  console.log(root);

  /**
   * @param {Object} nucNode
   * @param {Object} superNode
   * @param {Object} subNode
   * @return {Object}
   */
  function genScripts(nucNode, superNode, subNode) {
    const s = new Scripts();
    s.nucleus = nucNode;
    s.super = superNode;
    s.sub = subNode;
    return s;
  }

  /**
   * @param {String} char
   * @return {Formula}
   */
  function genGlyphFormula(char) {
    const rand = Math.floor(Math.random() * 10 + 1);
    const f = new Formula();
    for (let i = 0; i < rand; i++) {
      const g = new Glyph(char + i);
      f.push(g);
    }
    return f;
  }
}
