import Environment_Node from '../../Abstract/Environment_Node';
import Text_Environment_Setter from '../../Environments/Text Environment/Text_Environment_Setter';
import Text_Environment_Behavior from '../../Environments/Text Environment/Text_Environment_Behavior';
import textBlockFactory from './textBlockFactory';
/**
 * @param {Object} documentList
 * @return {Environment_Node}
 */
export default function textEnvironmentFactory(documentList) {
  const typesetter = new Text_Environment_Setter();
  const behavior = new Text_Environment_Behavior({ typesetter });
  const node = new Environment_Node(behavior);
  node.child = textBlockFactory(documentList.block);
  node.child.behavior.update();
  return node;
}
