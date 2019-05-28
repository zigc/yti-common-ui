import {Observable} from 'rxjs';

export type Language = string;

export interface Localization {
  lang: Language;
  value: string;
}

export interface Localizable { [language: string]: string; }
export interface LocalizableArray { [language: string]: string[]; }

export interface Localizer {
  translateLanguage$: Observable<Language>;
  translate(localizable: Localizable, useUILanguage?: boolean): string;
  translateToGivenLanguage(localizable: Localizable, languageToUse: string|null): string;
}
