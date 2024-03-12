export const shortStrFormat = (str: string, length: number): string => {
   return str.toString().length > length ? str.toString().substring(0, length) + '...' : str;
}