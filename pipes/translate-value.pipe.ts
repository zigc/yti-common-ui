import {Pipe, PipeTransform, OnDestroy, InjectionToken, Inject} from '@angular/core';
import {Subscription} from 'rxjs';
import {Localizable, Localizer} from '../types/localization';
import {isDefined} from '../utils/object';

export const LOCALIZER = new InjectionToken<string>('localizer');

@Pipe({
  name: 'translateValue',
  pure: false
})
export class TranslateValuePipe implements PipeTransform, OnDestroy {

  localization?: string;
  languageSubscription?: Subscription;

  constructor(@Inject(LOCALIZER) private localizer: Localizer) {
  }

  transform(value: Localizable, useUILanguage = false, useThisSpecificLanguage?: string): string {

    this.cleanSubscription();
    if (useThisSpecificLanguage) {
      this.localization = this.localizer.translateToGivenLanguage(value, useThisSpecificLanguage);

      this.languageSubscription = this.localizer.translateLanguage$.subscribe(() => {
        this.localization = this.localizer.translateToGivenLanguage(value, useThisSpecificLanguage);
      });
    } else {
      this.localization = this.localizer.translate(value, useUILanguage);

      this.languageSubscription = this.localizer.translateLanguage$.subscribe(() => {
        this.localization = this.localizer.translate(value, useUILanguage);
      });
    }

    return this.localization;
  }

  cleanSubscription() {
    if (isDefined(this.languageSubscription)) {
      this.languageSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.cleanSubscription();
  }
}
