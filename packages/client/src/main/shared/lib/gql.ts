import { DocumentNode } from '@apollo/client';

/**
 * Finds first op level field in GQL document node.
 */
export function findTopLevelField(node: DocumentNode): string | null {
  for (const definition of node.definitions) {
    if (definition.kind === 'OperationDefinition') {
      const { selectionSet } = definition;

      if (selectionSet.selections.length > 0) {
        const firstSelection = selectionSet.selections[0];

        if (firstSelection?.kind === 'Field') {
          return firstSelection.name.value;
        }
      }
    }
  }

  return null;
}

/**
 * Gets top level field's count in GQL document node.
 */
export function getTopLevelFieldsCount(node: DocumentNode): number {
  for (const definition of node.definitions) {
    if (definition.kind === 'OperationDefinition') {
      return definition.selectionSet.selections.length;
    }
  }

  return 0;
}
