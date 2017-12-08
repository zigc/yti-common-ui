import {InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from 'ng2-translate';
import {BreadcrumbComponent} from './components/breadcrumb.component';
import {FooterComponent} from './components/footer.component';
import {BackButtonComponent} from './components/back-button.component';
import {AjaxLoadingIndicatorComponent} from './components/ajax-loading-indicator.component';
import {AjaxLoadingIndicatorSmallComponent} from './components/ajax-loading-indicator-small.component';
import {ErrorModalComponent, ErrorModalService} from './components/error-modal.component';
import {ConfirmationModalComponent, ConfirmationModalService} from './components/confirmation-modal.component';
import {LoginModalComponent, LoginModalService} from './components/login-modal.component';
import {MenuComponent} from './components/menu.component';
import {DropdownComponent} from './components/dropdown.component';
import {FilterDropdownComponent} from './components/filter-dropdown.component';
import {AUTHENTICATED_USER_ENDPOINT} from './services/user.service';
import {TranslateValuePipe, LOCALIZER} from './pipes/translate-value.pipe';

declare var require: any;

export { AUTHENTICATED_USER_ENDPOINT };
export { LOCALIZER }
export const ietfLanguageTags: string[] = require('./assets/ietf-language-tags.json');

const components = [
  BreadcrumbComponent,
  FooterComponent,
  BackButtonComponent,
  AjaxLoadingIndicatorComponent,
  AjaxLoadingIndicatorSmallComponent,
  ErrorModalComponent,
  ConfirmationModalComponent,
  LoginModalComponent,
  MenuComponent,
  DropdownComponent,
  FilterDropdownComponent,
  TranslateValuePipe
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  entryComponents: [ // needed for modal components
    ErrorModalComponent,
    ConfirmationModalComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
    RouterModule
  ],
  providers: [
    ErrorModalService,
    LoginModalService,
    ConfirmationModalService,
    ConfirmationModalService,
  ]
})
export class YtiCommonModule {
}
