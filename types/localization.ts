
export type Language = string;

export interface Localization {
  lang: Language;
  value: string;
}

export interface Localizable { [language: string]: string; }
export interface LocalizableArray { [language: string]: string[]; }

export interface Localizer {
  translate(localizable: Localizable): string;
}
