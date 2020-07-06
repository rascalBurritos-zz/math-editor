import Display_Environment_Setter from '../../Environments/Display Environment/Display_Environment_Setter';
import Display_Environment_Behavior from '../../Environments/Display Environment/Display_Environment_Behavior';
import mathNodeFactory from '../Math/mathNodeFactory';
import DependancyOrganizer from './DependancyOrganizer';
import Environment_Node from '../../Abstract/Environment_Node';

/**
 * @param {Object} documentList
 * @return {Environment_Node}
 */
export default function displayEnvironmentFactory(documentList) {
  const spec = {};
  spec.rootStyle = documentList.rootStyle;
  const typesetter = new Display_Environment_Setter(spec);
  const behavior = new Display_Environment_Behavior({ typesetter });
  const node = new Environment_Node(behavior);
  node.child = mathNodeFactory(documentList.rootFormula, documentList.fontData);
  if (DependancyOrganizer.verifyPairs()) {
    DependancyOrganizer.linkDependants();
    DependancyOrganizer.clearMap();
  } else {
    console.log('failed dependants');
  }
  node.child.behavior.update();
  return node;
}
