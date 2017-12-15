export type Optional<T> = T|null|undefined;

export type EqualityChecker<T> = (lhs: T, rhs: T) => boolean;

export interface StringMapLike<V> {
  [index: string]: V;
}

export interface NumberMapLike<V> {
  [index: number]: V;
}

export function referenceEquality<T>(lhs: T, rhs: T) {
  return lhs === rhs;
}

export function areEqual<T>(lhs: Optional<T>, rhs: Optional<T>, equals: EqualityChecker<T> = referenceEquality): boolean {
  if ((isDefined(lhs) && !isDefined(rhs)) || (!isDefined(lhs) && isDefined(rhs))) {
    return false;
  } else if (!isDefined(lhs) && !isDefined(rhs)) {
    return true;
  } else {
    return equals(lhs!, rhs!);
  }
}

export function isDefined<T>(obj: Optional<T>): obj is T {
  return obj !== null && obj !== undefined;
}

export function requireDefined<T>(obj: Optional<T>, msg?: string): T {
  if (!isDefined(obj)) {
    throw new Error('Object must not be null or undefined: ' + msg);
  }
  return obj;
}

export function mapOptional<T, R>(obj: Optional<T>, fn: (obj: T) => R): R|null {
  if (isDefined(obj)) {
    return fn(obj);
  } else {
    return null;
  }
}

export function assertNever(_x: never, msg?: string): never {
  throw new Error(msg);
}

export function identity<T>(obj: T): T {
  return obj;
}

export function valuesExcludingKeys<V>(obj: StringMapLike<V>, exclude: Set<string>): V[] {

  const result: V[] = [];

  for (const entry of Object.entries(obj)) {
    if (!exclude.has(entry[0])) {
      result.push(entry[1]);
    }
  }

  return result;
}

export function stringMapToObject<V>(map: Map<string, V>): StringMapLike<V> {
  const result: StringMapLike<V> = {};
  map.forEach((value, key) => result[key] = value);
  return result;
}

export function numberMapToObject<V>(map: Map<number, V>): NumberMapLike<V> {
  const result: NumberMapLike<V> = {};
  map.forEach((value, key) => result[key] = value);
  return result;
}

export function isString(str: any): str is string {
  return typeof str === 'string';
}

export function isNumber(str: any): str is number {
  return typeof str === 'number';
}

export function isBoolean(str: any): str is boolean {
  return typeof str === 'boolean';
}

export function hasValue(obj: any) {
  for (const value of Object.values(obj)) {
    if (!!value) {
      return true;
    }
  }
  return false;
}
