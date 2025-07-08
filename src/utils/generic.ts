export function tickerFromIdentifier(identifier: string): string {
  return identifier.split('-').slice(0, 2).join('-');
}
