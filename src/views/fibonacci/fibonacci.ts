
export function generateFibonacciList(length: number): number[] {
  if (length <= 0) {
    return [];
  } else if (length === 1) {
    return [0];
  } else if (length === 2) {
    return [0, 1];
  }

  // init fib
  const fibList: number[] = [0, 1];

  for (let i = 2; i < length; i++) {
    fibList[i] = fibList[i - 1] + fibList[i - 2];
  }

  return fibList;
}

