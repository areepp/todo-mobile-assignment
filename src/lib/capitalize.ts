export default function capitalize(str: string): string {
  if (!str) return str // Return the original string if it's empty
  return str.charAt(0).toUpperCase() + str.slice(1)
}
