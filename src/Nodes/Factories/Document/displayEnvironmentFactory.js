import Display_Environment_Setter from '../../../Environments/Display Environment/Display_Environment_Setter';
import Display_Environment_Behavior from '../../../Environments/Display Environment/Display_Environement_Behavior';
import Display_Environment_Node from '../../../Environments/Display Environment/Display_Environment_Node';
import mathNodeFactory from '../Math/mathNodeFactory';
import DependancyOrganizer from './DependancyOrganizer';

/**
 * @param {Object} documentList
 * @return {Display_Environment_Node}
 */
export default function displayEnvironmentFactory(documentList) {
  const spec = {};
  spec.rootStyle = documentList.rootStyle;
  const typesetter = new Display_Environment_Setter(spec);
  const behavior = new Display_Environment_Behavior({ typesetter });
  const node = new Display_Environment_Node(behavior);
  node.rootFormula = mathNodeFactory(
    documentList.rootFormula,
    documentList.fontData
  );
  if (DependancyOrganizer.verifyPairs()) {
    DependancyOrganizer.linkDependants();
    DependancyOrganizer.clearMap();
  } else {
    console.log('failed dependants');
  }
  node.rootFormula.behavior.update();
  return node;
}
