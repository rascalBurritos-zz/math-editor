import Vertical_List_Setter from '../../Environments/Vertical List/Vertical_List_Setter';
import Vertical_List_Behavior from '../../Environments/Vertical List/Vertical_List_Behavior';
import documentViewFactory from '../documentViewFactory';
/** @typedef {import('../../Abstract/Behavior').default} Behavior  */

/**
 * @param {Object} documentList
 * @return {Behavior}
 */
export default function verticalListFactory(documentList) {
  const spec = {};
  spec.baselineDistance = documentList.baselineDistance;
  spec.baselineBump = documentList.baselineBump;
  const typesetter = new Vertical_List_Setter(spec);
  const behavior = new Vertical_List_Behavior({ typesetter });
  const elements = [];
  for (const subList of documentList.elements) {
    elements.push(documentViewFactory(subList));
  }
  behavior.elementBehaviors = elements;
  return behavior;
}
