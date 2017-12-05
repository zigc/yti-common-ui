import {InjectionToken} from '@angular/core';

declare var require: any;

export const AUTHENTICATED_USER_ENDPOINT = new InjectionToken<string>('authenticated.user.endpoint');
export const ietfLanguageTags: string[] = require('./assets/ietf-language-tags.json');
