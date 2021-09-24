import type { ReactNode } from 'react';

export function isPrimitiveReactNode(node: ReactNode) {
  return typeof node === 'string' || typeof node === 'number';
}
