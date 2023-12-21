export function gql(arr: TemplateStringsArray): string {
  let str = arr[0];

  for (let i = 1; i < arguments.length; i += 1) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands,prefer-rest-params
    str += arguments[i] + arr[i];
  }

  return str || '';
}
