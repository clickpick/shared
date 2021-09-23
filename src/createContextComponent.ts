import type { PropsWithChildren, PropsWithoutRef } from 'react';
import { createElement, useContext } from 'react';

type ContextRecord = Record<string, unknown>;
type ContextProps = PropsWithoutRef<ContextRecord>;

/**
 * Функция для создания компонента-контекста
 *
 * @example Создание компонента
 *   const { Provider, Context, hook: useComponentContext } = createContextComponent<{ value: string }>((props) => {
 *     const [value, setValue] = useState(props.value);
 *
 *     return {
 *       value,
 *       setValue,
 *     };
 *   });
 *
 * @example Оборачивание провайдером на верхнем уровне
 *   <Provider value="some_value">
 *     <Children />
 *   </Provider>
 *
 * @example Использование
 *   const { value, setValue } = useContext(Context)
 *   --or--
 *   const { value, setValue } = useComponentContext();
 */
export const createContextComponent = function <P extends ContextProps, H = ContextRecord>(handlerCreator: (props: P) => H) {
  const Context = React.createContext<H>(null as unknown as H);

  const Provider = (props: PropsWithChildren<P>) => {
    return createElement(Context.Provider, {
      value: handlerCreator(props),
    }, props.children);
  }

  return {
    Provider: Provider,
    Consumer: Context.Consumer,
    Context,
    hook: () => useContext(Context),
  };
};