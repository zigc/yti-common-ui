import {Component, Input} from '@angular/core';
import { TranslateService } from 'ng2-translate';

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
          <p translate>This service is developed and maintained by Population Registry Center of Finland</p>
        </div>

        <div class="col-md-4">

          <ul class="link-list">
            <li>
              <a (click)="onInformationClick()" translate>Information about the web service</a>
            </li>
            <li>
              <a href="{{descriptionOfFileLink}}" target="_blank" translate>Description of file</a>
            </li>
            <li *ngIf="showUserSupportLink()">
              <a href="/ohjeet" translate>User support</a>
            </li>
            <li>
              <a href="{{feedbackLink}}" translate>Feedback</a>
            </li>
          </ul>
        </div>

        <div class="col-md-4">
          <a href="{{licenseLink}}" target="_blank" translate>Sourcecode is licensed under EUPL-1.2 license.</a>          
        </div>
      </div>

    </div>
  `
})
export class FooterComponent {

  @Input() title: string;
  @Input() onInformationClick: () => void;

  constructor(private translateService: TranslateService) {
  }

  get language() {
    return this.translateService.currentLang;
  }

  get licenseLink() {
    return 'https://eupl.eu/1.2/' + this.language + '/';
  }

  get feedbackLink() {
    const subject = this.translateService.instant('Contact') + ':%20' + this.title;
    return 'mailto:yhteentoimivuus@vrk.fi?subject=' + subject;
  }

  get descriptionOfFileLink() {
    return 'https://yhteentoimiva.suomi.fi/tietosuojaseloste.pdf';
  }

  showUserSupportLink() {
    return false;
  }

  showInformationLink() {
    return false;
  }
}
