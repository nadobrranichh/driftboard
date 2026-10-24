export function arraysAreEqual(arr1: number[], arr2: number[]) {
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = arr1.toSorted((a, b) => a - b);
  const sortedArr2 = arr2.toSorted((a, b) => a - b);

  return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
}
