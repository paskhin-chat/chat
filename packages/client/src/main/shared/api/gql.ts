export function gql(arr: TemplateStringsArray): string {
  let str = arr[0];

  for (let i = 1; i < arguments.length; ++i) {
    str += arguments[i] + arr[i];
  }

  return str || "";
}
