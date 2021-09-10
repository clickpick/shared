export type ClassName = number | string | Record<string, boolean | undefined | null> | false | null | undefined;

export function classNames(...args: ClassName[]): string {
  const result: string[] = [];

  args.forEach((item) => {
    if (!item) return;

    switch (typeof item) {
      case 'string':
        result.push(item);
        break;

      case 'object':
        Object.keys(item).forEach((key: string) => {
          if (item[key]) result.push(key);
        });
        break;

      default:
        result.push(`${item}`);
    }
  });

  return result.join(' ');
}
