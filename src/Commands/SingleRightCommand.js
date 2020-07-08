import Command from './Command';

export default class SingleRight extends Command {
  /**
   *
   * @param {*} rootNode
   * @param {*} caret
   */
  constructor(rootNode, caret) {
    super(rootNode, caret);
  }

  /**
   * @override
   */
  execute() {}
}
