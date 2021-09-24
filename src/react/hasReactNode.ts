import type { ReactNode } from 'react';

export function hasReactNode(value: ReactNode) {
  return value !== undefined && value !== false && value !== null;
}
