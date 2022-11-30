export function isErrorWithData(error: unknown): error is { data: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "data" in error &&
    typeof (error as any).data === "string"
  )
}
