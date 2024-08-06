export function catalogChunk<T>(arr: T[], n: number): T[][] {
  if (!arr || !Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }
  if (n <= 0 || !Number.isInteger(n)) {
    throw new Error("Chunk size must be a positive integer");
  }
  if (arr.length === 0) {
    return [];
  }
  const chunkSize = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (_, index) =>
    arr.slice(index * chunkSize, (index + 1) * chunkSize)
  );
}
