import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `

    <div class="container-fluid">

      <div class="row">
        <div class="col-12 pb-2">
          <a href="/"><h4 class="title">{{title}}</h4></a>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <p translate>This service is developed and maintained by Digital and Population Data Services Agency</p>
        </div>

        <div class="col-md-4">

          <ul class="link-list">
            <li>
              <a id="information_link" (click)="informationClick.emit()" translate>Information about the service</a>
            </li>
            <li>
              <a id="description_of_file_link" [href]="descriptionOfFileLink" target="_blank" rel="noopener noreferrer" translate>Description of file</a>
            </li>
            <li *ngIf="showUserSupportLink()">
              <a id="user_support_link" href="/ohjeet" translate>User support</a>
            </li>
            <li>
              <a id="feedback_link" [href]="feedbackLink" translate>Feedback</a>
            </li>
          </ul>
        </div>

        <div class="col-md-4">
          <ul class="link-list">
            <li>
              <a id="license_link" [href]="licenseLink" target="_blank" rel="noopener noreferrer" translate>Sourcecode is licensed under EUPL-1.2 license.</a>
            </li>
            <li *ngIf="showLicenseIcon" class="">
              <a id="licence_icon_text_link" [href]="licenseIconLink" target="_blank" rel="noopener noreferrer" translate>Content has been licensed with CC by 4.0 license.</a>
            </li>
          </ul>
        </div>
      </div>

    </div>
  `
})
export class FooterComponent {

  @Input() title: string;
  @Input() showLicenseIcon?: boolean;
  @Output() informationClick = new EventEmitter();

  constructor(private translateService: TranslateService) {
  }

  get licenseLink() {
    return 'https://ec.europa.eu/info/european-union-public-licence';
  }

  get licenseIconLink() {
    return 'https://creativecommons.org/licenses/by/4.0/';
  }

  get feedbackLink() {
    const subject = this.translateService.instant('Contact') + ':%20' + this.title;
    return 'mailto:yhteentoimivuus@dvv.fi?subject=' + subject;
  }

  get descriptionOfFileLink() {
    return 'https://wiki.dvv.fi/display/YTIJD/Tietosuojaseloste';
  }

  showUserSupportLink() {
    return false;
  }
}
