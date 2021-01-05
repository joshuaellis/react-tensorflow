/* eslint-disable @typescript-eslint/no-explicit-any */
export default function logOnce<T extends (...args: any[]) => ReturnType<T>> (
  fn: T
): T {
  let used = false
  let result: ReturnType<T>

  return ((...args: any[]) => {
    if (!used) {
      used = true
      result = fn(...args)
    }
    return result
  }) as T
}
