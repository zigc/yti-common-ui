import { Component, Injectable, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class AlertModalService {

  constructor(private modalService: NgbModal) {
  }

  open(title: string): AlertModalComponent {
    const modalRef = this.modalService.open(AlertModalComponent, { size: 'sm', backdrop: 'static', keyboard: false });
    const instance = modalRef.componentInstance as AlertModalComponent;
    instance.title = title;
    return instance;
  }

  openWithMessageAndTitle(title: string, message: string): AlertModalComponent {
    const modalRef = this.modalService.open(AlertModalComponent, { size: 'sm', backdrop: 'static', keyboard: false });
    const instance = modalRef.componentInstance as AlertModalComponent;
    instance.title = title;
    instance.message = message;
    return instance;
  }

  openWithMessageAndTitleAndShowOkButtonAndReturnPromise(title: string, message: string): Promise<any> {
    const modalRef = this.modalService.open(AlertModalComponent, { size: 'sm', backdrop: 'static', keyboard: false });
    const instance = modalRef.componentInstance as AlertModalComponent;
    instance.title = title;
    instance.message = message;
    instance.showOkButton = true;
    return modalRef.result;
  }
}

@Component({
  selector: 'app-alert-modal',
  styleUrls: [],
  template: `
    <div class="modal-header modal-header-warning">
      <h4 class="modal-title">
        <span translate>{{title}}</span>
      </h4>
      <h4 class="modal-title">
        <a style="float: top" *ngIf="enableClosingActions"><i id="close_alert_modal_link" class="fa fa-times" (click)="cancel()"></i></a>
      </h4>
    </div>
    <div class="modal-body">
      <app-ajax-loading-indicator *ngIf="message === undefined"></app-ajax-loading-indicator>
      <span *ngIf="message !== undefined">{{message}}</span>
      <a id="alert_modal_link" *ngIf="link" rel="noopener noreferrer" [href]="link" target="_blank">{{linkTitleText}}</a>
    </div>
    <div class="modal-footer" *ngIf="showOkButton && enableClosingActions">
      <button id="confirm_alert_modal_button" type="button" class="btn btn-secondary-action confirm" (click)="cancel()">OK</button>
    </div>
  `
})
export class AlertModalComponent {

  @Input() title: string;
  @Input() message: string;
  @Input() link: string;
  @Input() linkTitle: string;
  @Input() showOkButton = false;
  @Input() enableClosingActions = true;

  constructor(private modal: NgbActiveModal) {
  }

  get linkTitleText () {
    return this.linkTitle ? this.linkTitle : this.link;
  }

  cancel() {
    this.modal.dismiss('cancel');
  }

  confirm() {
    this.modal.close();
  }

  close() {
    this.modal.close();
  }
}
