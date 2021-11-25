import type { Nullable } from './types';
import { isString } from './type-checkers';

export const hasString = (string?: Nullable<string>): string is string => {
  return isString(string) && string !== '';
};
