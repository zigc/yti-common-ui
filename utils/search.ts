import { quoteLiteralForRegexp } from './regex';
import { Localizable } from '../types/localization';

export function splitSearchString(search?: string): string[] | undefined {
  if (search) {
    const searchParts = search.split(/\s+/).filter(part => !!part);
    if (searchParts.length) {
      return searchParts;
    }
  }
  return undefined;
}

export function makePrefixPostfixSearchRegexp(searchParts: string[]): RegExp {
  const expString = '^' + searchParts.map(quoteLiteralForRegexp).map(quoted => '(?=.*(?:' + quoted + '\\b|\\b' + quoted + '))').join('');
  return new RegExp(expString, 'i');
}

export function makeAnywhereSearchRegexp(searchParts: string[]): RegExp {
  const expString = '^' + searchParts.map(quoteLiteralForRegexp).map(quoted => '(?=.*' + quoted + ')').join('');
  return new RegExp(expString, 'i');
}

export function makeSimpleSearchRegexp(search: string, global: boolean = false): RegExp {
  return new RegExp(quoteLiteralForRegexp(search), global ? 'gi' : 'i');
}

export function makePrefixPostfixHighlightRegexp(searchParts: string[]): RegExp {
  const expString = searchParts.sort(longestFirstComparator).map(quoteLiteralForRegexp).map(quoted => quoted + '\\b|\\b' + quoted).join('|');
  return new RegExp(expString, 'gi');
}

export function makeAnywhereHighlightRegexp(searchParts: string[]): RegExp {
  const expString = searchParts.sort(longestFirstComparator).map(quoteLiteralForRegexp).join('|');
  return new RegExp(expString, 'gi');
}

/**
 * Append HTML b-tags around prefix and postfix matches of given search parts.
 * @param results the item array to process
 * @param searchParts splitted search query; if undefined then do nothing
 * @param localizableExtractor function to get label for the item
 * @param localizableSetter if defined then the extracted label will not be modified in place, but instead this method will be used to set newly created label for the item
 */
export function highlightPrefixPostfixResults<T>(results: T[],
                                                 searchParts: string[] | undefined,
                                                 localizableExtractor: (item: T) => Localizable,
                                                 localizableSetter?: (item: T, highlighted: Localizable) => void): T[] {
  if (searchParts && searchParts.length) {
    const re: RegExp = makePrefixPostfixHighlightRegexp(searchParts);
    results.forEach(item => {
      const label: Localizable = localizableExtractor(item);
      const target: Localizable = localizableSetter ? {} : label;
      for (let language of Object.keys(label)) {
        target[language] = label[language].replace(re, '<b>$&</b>');
      }
      if (localizableSetter) {
        localizableSetter(item, target);
      }
    });
  }
  return results;
}

export function filterByPrefixPostfixSearch<T>(items: T[],
                                               searchParts: string[] | undefined,
                                               localizableExtractor: (item: T) => Localizable): T[] {
  if (searchParts && searchParts.length) {
    const re: RegExp = makePrefixPostfixSearchRegexp(searchParts);
    return items.filter(item => {
      const label: Localizable = localizableExtractor(item);
      for (let language of Object.keys(label)) {
        if (re.test(label[language])) {
          return true;
        }
      }
      return false;
    });
  }
  return items.slice();
}

function longestFirstComparator(a: string, b: string): number {
  const diff = b.length - a.length;
  return diff != 0 ? diff : a.localeCompare(b);
}
