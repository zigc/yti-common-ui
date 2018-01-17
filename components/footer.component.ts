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
              <a href="/tietoa-suomifi-verkkopalvelusta" translate>Information about the web service</a>
            </li>
            <li>
              <a href="/tietosuojaseloste" translate>Description of file</a>
            </li>
            <li>
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

  constructor(private translateService: TranslateService) {
  }

  get licenseLink() {
    const language = this.translateService.currentLang;
    return 'https://eupl.eu/1.2/' + language + '/';;
  }

  get feedbackLink() {
    const subject = this.translateService.instant('Contact') + ':%20' + this.title;
    return 'mailto:yhteentoimivuus@vrk.fi?subject=' + subject;
  }
}
