/** @typedef {import('../../Abstract/Behavior').default} Behavior */

export default class DependancyOrganizer {
  map = {};

  /**
   * @param {String} id
   * @param {Behavior} behavior
   */
  registerSource(id, behavior) {
    if (!this.map[id]) {
      this.map[id] = {};
    }
    this.map[id].source = behavior;
  }

  /**
   * @param {String} id
   * @param {Behavior} behavior
   */
  registerDrain(id, behavior) {
    if (!this.map[id]) {
      this.map[id] = {};
      if (this.map[id].drain === undefined) {
        this.map[id].drain = [];
      }
    }
    this.map[id].drain.push(behavior);
  }

  /**
   *
   */
  linkDependants() {
    const map = this.map;
    for (const pairID in map) {
      if (map[pairID]) {
        const drainBehaviors = map[pairID].drain.reduce((acc, curr) => {
          acc.push(curr);
          return acc;
        }, []);
        map[pairID].source.registerDependantBehavior(...drainBehaviors);
        for (const behavior of map[pairID].drain) {
          behavior.target = map[pairID].source;
        }
      }
    }
  }

  /**
   * @return {boolean}
   */
  verifyPairs() {
    const map = this.map;

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
