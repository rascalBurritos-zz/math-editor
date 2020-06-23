/** @typedef {import('../Abstract/Document_Node').default} Document_Node */

export default class DependancyOrganizer {
  static map = {};

  /**
   * @param {String} id
   * @param {Document_Node} node
   */
  static registerSource(id, node) {
    if (!DependancyOrganizer.map[id]) {
      DependancyOrganizer.map[id] = {};
    }
    DependancyOrganizer.map[id].source = node;
  }
  /**
   * @param {String} id
   * @param {Document_Node} node
   */
  static registerDrain(id, node) {
    if (!DependancyOrganizer.map[id]) {
      DependancyOrganizer.map[id] = {};
      if (DependancyOrganizer.map[id].drain === undefined) {
        DependancyOrganizer.map[id].drain = [];
      }
    }
    DependancyOrganizer.map[id].drain.push(node);
  }

  /**
   *
   */
  static linkDependants() {
    const map = DependancyOrganizer.map;
    for (const pairID in map) {
      if (map[pairID]) {
        const drainBehaviors = map[pairID].drain.reduce((acc, curr) => {
          acc.push(curr.behavior);
          return acc;
        }, []);
        map[pairID].source.behavior.registerDependantBehavior(
          ...drainBehaviors
        );
        for (const node of map[pairID].drain) {
          node.behavior.target = map[pairID].source.behavior;
        }
      }
    }
  }

  /**
   *
   */
  static clearMap() {
    DependancyOrganizer.map = {};
  }

  /**
   * @return {boolean}
   */
  static verifyPairs() {
    const map = DependancyOrganizer.map;

    return verifySources() && verifyDrains();

    /**
     * @return {boolean}
     */
    function verifyDrains() {
      for (const pairID in map) {
        if (map[pairID].drain === undefined) {
          return false;
        }
      }
      return true;
    }
    /**
     * @return {boolean}
     */
    function verifySources() {
      for (const pairID in map) {
        if (map[pairID].source === undefined) {
          return false;
        }
      }
      return true;
    }
  }
}
