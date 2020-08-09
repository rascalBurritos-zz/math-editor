export default class Identity {
  static id = 0;
  /**
   *@return {number}
   */
  static getNextId() {
    return Identity.id++;
  }
}
