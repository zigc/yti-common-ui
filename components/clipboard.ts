import { Component, Input, ViewChild } from '@angular/core';
import { NgbPopover, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardService } from 'ngx-clipboard';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-clipboard',
  styleUrls: ['./clipboard.scss'],
  template: `
      <a *ngIf="displayValue && showAsLink" target="_blank" rel="noopener noreferrer" href="{{displayValue}}">{{displayValue}}</a>
      <span *ngIf="displayValue && !showAsLink">{{displayValue}}</span>
      <i class="far fa-copy"
         #t="ngbTooltip"
         ngbTooltip="{{'Copy value to clipboard' | translate:translateParams}}"
         #p="ngbPopover"
         ngbPopover="{{'Copied to clipboard' | translate}}"
         ngxClipboard
         (click)="clickToolTip()"></i>
  `
})
export class ClipboardComponent {

  @ViewChild('t') public tooltip: NgbTooltip;
  @ViewChild('p') public popover: NgbPopover;

  /**
   * If displayValue is given, then it is shown before icon as either a link or text. If only displayValue is given then
   * it is used as the value too. Either of the displayValue or value must be given.
   */
  @Input() displayValue?: string;
  /**
   * Whether to assume the displayValue to be a link and render it as such.
   */
  @Input() showAsLink = false;
  /**
   * Value to copy to clipboard, or then a provider used to construct the value. If not given then displayValue is used as the value,
   * and thus must be given.
   */
  @Input() value?: string | (() => string);
  /**
   * Description of copied content used in a tooltip. If not given then displayValue is tried, and finally a generic "value" is used.
   */
  @Input() description?: string;

  constructor(private clipboardService: ClipboardService,
              private translateService: TranslateService) {
  }

  get translateParams() {
    return {
      value: this.description ? this.description : this.displayValue ? this.displayValue : this.translateService.instant('value')
    };
  }

  clickToolTip() {
    const content = typeof this.value === 'string' ? this.value : this.value ? this.value() : this.displayValue;
    if (content) {
      this.clipboardService.copyFromContent(content);
      this.tooltip.close();
      setTimeout(() => {
        this.popover.close();
      }, 1500);
    } else {
      this.tooltip.close();
      setTimeout(() => {
        this.popover.close();
      }, 0);
    }
  }
}
