import documentNodeFactory from '../../Factories/documentNodeFactory';
import CaretBehavior from '../../General Document/CaretBehavior';
import docListOne from '../../Test/docListOne';

/**
 * @return {Object} document state
 */
export default function documentStartup() {
  const rootNode = documentNodeFactory(docListOne);
  const startingCaretNode = rootNode.leftCaretNode;
  const caretBehavior = new CaretBehavior();
  caretBehavior.currentCaretNode = startingCaretNode;
  return { caretBehavior, rootNode };
}
