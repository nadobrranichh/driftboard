export function isSingular(num: number) {
  return num.toString().endsWith("1") && !num.toString().endsWith("11");
}
