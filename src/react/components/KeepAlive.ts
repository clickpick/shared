import type { FC, HTMLAttributes, ElementType } from 'react';
import type { AnyObject } from '../../types';
import { useState, useEffect, createElement } from 'react';

export interface BaseKeepAliveProps {
  /** HTML элемент обёртки. По умолчанию `div` */
  as?: ElementType;
  /** Вмонтирован ли компонент */
  mounted?: boolean;
}

export type KeepAliveProps = BaseKeepAliveProps & HTMLAttributes<HTMLElement>;

/**
 * Компонент для рендеринга содержимого один раз.
 * В последующих рендерингах, когда проп `mounted` будет переключаться с `true` на `false`,
 * контент будет скрываться с помощью аттрибута `hidden`.
 */
export const KeepAlive: FC<KeepAliveProps> = ({ as: type = 'div', mounted = false, ...props }) => {
  const [rendered, setRendered] = useState<boolean>(mounted);

  useEffect(() => {
    if (mounted) setRendered(true);
  }, [mounted]);

  if (!rendered) return null;

  return createElement(
    type,
    Object.assign<AnyObject, KeepAliveProps, Pick<KeepAliveProps, 'hidden'>>({}, props, { hidden: !mounted }),
    props.children
  );
};
