import { getComponentStyle } from '../../Functional/BaseView';
import fontMapper from '../../../Factories/Document/fontMapper';
import { ViewMaster } from '../../Functional/ViewMaster';
import { Compound } from '../../../React-Components/Text/Compound';
import './DisplayEnv.css';
import { DISPLAY_ENV_TYPE } from '../../Functional/Node Types';
import { getViewGenerator } from '../../Functional/BaseViewFactory';
import DependancyOrganizer from './DependancyOrganizer';

const getView = getViewGenerator(DISPLAY_ENV_TYPE, Compound);
/**
 * @param {Object} docList
 * @param {Object} collectingView
 * @return {Object}
 */
export default function displayEnvironmentFactory(docList, collectingView) {
  const font = fontMapper(docList.fontName);
  const dependancyOrganizer = new DependancyOrganizer();
  ViewMaster.generateMath(
    docList.rootFormula,
    font,
    docList.rootStyle,
    collectingView,
    dependancyOrganizer
  );
  const childId = docList.rootFormula.id;
  dependancyOrganizer.linkDependants(collectingView);
  const child = ViewMaster.generateMath(
    docList.rootFormula,
    font,
    docList.rootStyle,
    collectingView,
    dependancyOrganizer
  );
  const view = getView(child.metrics, docList.id, [childId]);
  return view;
}
