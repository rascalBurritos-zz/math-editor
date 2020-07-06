import DependancyOrganizer from './DependancyOrganizer';
import Vertical_List_Setter from '../../Environments/Vertical List/Vertical_List_Setter';
import Vertical_List_Behavior from '../../Environments/Vertical List/Vertical_List_Behavior';
import Vertical_List_Node from '../../Environments/Vertical List/Vertical_List_Node';
import documentNodeFactory from '../documentNodeFactory';

/**
 * @param {Object} documentList
 * @return {Vertical_List_Node  }
 */
export default function verticalListFactory(documentList) {
  const spec = {};
  spec.baselineDistance = documentList.baselineDistance;
  spec.baselineBump = documentList.baselineBump;
  const typesetter = new Vertical_List_Setter(spec);
  const behavior = new Vertical_List_Behavior({ typesetter });
  const node = new Vertical_List_Node(behavior);
  const elements = [];
  for (const subList of documentList.elements) {
    elements.push(documentNodeFactory(subList));
  }
  node.elements = elements;
  return node;
}
