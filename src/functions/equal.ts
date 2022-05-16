export function isEqual(...objects: any): boolean {
  return objects.every((obj: any) => JSON.stringify(obj) === JSON.stringify(objects[0]));
}
