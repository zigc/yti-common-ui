import { isDefined, EqualityChecker } from './object';

export function limit<T>(arr: T[], amount: number): T[] {
  return arr.slice(0, Math.min(amount, arr.length));
}

export function filterDefined<T>(arr: (T|null|undefined)[]): T[] {
  const result: T[] = [];

  for (const item of arr) {
    if (isDefined(item)) {
      result.push(item);
    }
  }

  return result;
}

export function normalizeAsArray<T>(obj: T|T[]|undefined): T[] {
  return Array.isArray(obj) ? obj : isDefined(obj) ? [obj] : [];
}

export function collectProperties<T, TResult>(items: T[]|T[][], propertyExtractor: (item: T) => TResult): Set<TResult> {
  const result = new Set<TResult>();
  for (const item of items) {
    if (Array.isArray(item)) {
      for (const innerItem of item) {
        result.add(propertyExtractor(innerItem));
      }
    } else {
      result.add(propertyExtractor(item));
    }
  }
  return result;
}

export function index<T, TIndex>(items: T[], indexExtractor: (item: T) => TIndex): Map<TIndex, T> {
  const result = new Map<TIndex, T>();

  for (const item of items) {
    result.set(indexExtractor(item), item);
  }

  return result;
}

export function moveElement<T>(array: T[], fromIndex: number, toIndex: number, indexChangedCb?: (item: T, index: number) => void) {

  if (fromIndex >= array.length || fromIndex < 0) {
    throw new Error('From index out of bounds: ' + fromIndex);
  }

  if (toIndex >= array.length || toIndex < 0) {
    throw new Error('Index2 out of bounds: ' + toIndex);
  }

  const value = array.splice(fromIndex, 1);
  array.splice(toIndex, 0, value[0]);

  if (indexChangedCb) {
    indexChangedCb(array[toIndex], toIndex);

    if (fromIndex < toIndex) {
      for (let i = fromIndex; i < toIndex; i++) {
        indexChangedCb(array[i], i);
      }
    } else if (fromIndex > toIndex) {
      for (let i = toIndex + 1; i <= fromIndex; i++) {
        indexChangedCb(array[i], i);
      }
    }
  }
}

export function swapElements<T>(array: T[], index1: number, index2: number, indexChangedCb?: (item: T, index: number) => void) {

  if (index1 >= array.length || index1 < 0) {
    throw new Error('Index1 out of bounds: ' + index1);
  }

  if (index2 >= array.length || index1 < 0) {
    throw new Error('Index2 out of bounds: ' + index1);
  }

  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;

  if (indexChangedCb) {
    indexChangedCb(array[index1], index1);
    indexChangedCb(array[index2], index2);
  }
}

export function resetWith<T>(array: T[], toResetWith: T[]) {
  array.splice(0, array.length);
  for (const item of toResetWith) {
    array.push(item);
  }
}


export function referenceEquality<T>(lhs: T, rhs: T) {
  return lhs === rhs;
}

export function anyMatching<T>(arr: T[], predicate: (item: T) => boolean) {
  for (const item of arr) {
    if (predicate(item)) {
      return true;
    }
  }
  return false;
}

export function allMatching<T>(arr: T[], predicate: (item: T) => boolean) {
  for (const item of arr) {
    if (!predicate(item)) {
      return false;
    }
  }
  return true;
}

export function firstMatching<T>(arr: T[], predicate: (item: T) => boolean): T|null {
  for (const item of arr) {
    if (predicate(item)) {
      return item;
    }
  }
  return null;
}

export function contains<T>(arr: T[], value: T, equals: EqualityChecker<T> = referenceEquality): boolean {
  return anyMatching(arr, (item: T) => equals(item, value));
}

export function containsAny<T>(arr: T[], values: T[], equals: EqualityChecker<T> = referenceEquality): boolean {
  return anyMatching(values, (value: T) => contains(arr, value, equals));
}

export function containsAll<T>(arr: T[], values: T[], equals: EqualityChecker<T> = referenceEquality): boolean {
  return allMatching(values, (value: T) => contains(arr, value, equals));
}

export function arraysAreEqual<T>(lhs: T[], rhs: T[], equals: EqualityChecker<T> = referenceEquality) {
  return containsAll(lhs, rhs, equals) && containsAll(rhs, lhs, equals);
}

export function firstMatchingValue<T>(arr: T[], values: T[], equals: EqualityChecker<T> = referenceEquality): T|null {
  return firstMatching(arr, item => contains(values, item, equals));
}

// return true if removed
export function removeMatching<T>(arr: T[], predicate: (item: T) => boolean) {

  const matchingIndices: number[] = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    const item = arr[i];
    if (predicate(item)) {
      matchingIndices.push(i);
    }
  }

  for (const i of matchingIndices) {
    arr.splice(i, 1);
  }

  return matchingIndices.length > 0;
}

// returns true is replaced
export function replaceMatching<T>(arr: T[], predicate: (item: T) => boolean, replaceWith: T) {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) {
      arr[i] = replaceWith;
      return true;
    }
  }
  return false;
}

export function keepMatching<T>(arr: T[], predicate: (item: T) => boolean) {
  removeMatching(arr, item => !predicate(item));
}

export function remove<T>(arr: T[], item: T): void {
  removeMatching(arr, i => i === item);
}

export function flatten<T>(arr: T[][]) {

  const result: T[] = [];

  for (const innerArr of arr) {
    for (const item of innerArr) {
      result.push(item);
    }
  }

  return result;
}

export function groupBy<T, I>(arr: T[], indexByExtractor: (item: T) => I): Map<I, T[]> {

  const result = new Map<I, T[]>();

  function createOrGet(indexProperty: I): T[] {
    const resultList = result.get(indexProperty);

    if (resultList) {
      return resultList;
    } else {
      const newResultList: T[] = [];
      result.set(indexProperty, newResultList);
      return newResultList;
    }
  }

  for (const item of arr) {
    createOrGet(indexByExtractor(item)).push(item);
  }

  return result;
}

export function requireSingle<T>(arr: T[]): T {
  if (arr.length !== 1) {
    throw new Error('Single element required, was: ' + arr.length);
  }

  return arr[0];
}

export function insertBefore<T>(arr: T[], item: T, ref: T) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ref) {
      arr.splice(i, 0, item);
      return;
    }
  }

  throw new Error('Reference item not in array');
}

export type Mapper<T, R> = (item: T) => R;

export function first<T>(arr: T[]): T {

  if (arr.length === 0) {
    throw new Error('Cannot get first since array is empty');
  }

  return arr[0];
}

export function last<T>(arr: T[]): T {

  if (arr.length === 0) {
    throw new Error('Cannot get last since array is empty');
  }

  return arr[arr.length - 1];
}

export function nextOf<T>(arr: T[], item: T) {
  return nextOfMatching(arr, x => x === item);
}

export function nextOfMatching<T>(arr: T[], predicate: (item: T) => boolean): T|null {

  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) {

      const isLast = i === arr.length - 1;

      if (isLast) {
        return null;
      } else {
        return arr[i + 1];
      }
    }
  }

  throw new Error('Item not in array');
}

export function previousOf<T>(arr: T[], item: T) {
  return previousOfMatching(arr, x => x === item);
}

export function previousOfMatching<T>(arr: T[], predicate: (item: T) => boolean): T|null {

  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) {
      if (i === 0) {
        return null;
      } else {
        return arr[i - 1];
      }
    }
  }

  throw new Error('Item not in array');
}
