import Display_Environment_Setter from '../../Environments/Display Environment/Display_Environment_Setter';
import Display_Environment_Behavior from '../../Environments/Display Environment/Display_Environment_Behavior';
import mathViewFactory from '../Math/mathViewFactory';
import DependancyOrganizer from './DependancyOrganizer';
import Environment_Node from '../../Abstract/Environment_Node';
import mathViewFactory from '../Math/mathViewFactory';

/**
 * @param {Object} documentList
 * @return {Environment_Node}
 */
export default function displayEnvironmentFactory(documentList) {
  const spec = {};
  spec.rootStyle = documentList.rootStyle;
  const typesetter = new Display_Environment_Setter(spec);
  const behavior = new Display_Environment_Behavior({ typesetter });
  behavior.childBehavior = mathViewFactory(
    documentList.rootFormula,
    documentList.fontData
  );
  if (DependancyOrganizer.verifyPairs()) {
    DependancyOrganizer.linkDependants();
    DependancyOrganizer.clearMap();
  } else {
    console.log('failed dependants');
  }
  node.child.behavior.update();
  return node;
}
