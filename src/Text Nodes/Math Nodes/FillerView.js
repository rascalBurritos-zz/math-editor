import Metrics from '../../Math Nodes/Types/Metrics';
import Spacing_Style from '../../Math Nodes/Types/Spacing_Style';

/**
 * @return {Object}
 */
export default function getFillerView() {
  return {
    spacingStyle: Spacing_Style.None,
    metrics: new Metrics(0, 0, 0),
    componentStyle: { height: 0, width: 0 },
  };
}
