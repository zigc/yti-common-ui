import { Component, Injectable, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface ErrorOptions {
  title: string;
  body: string;
  bodyParams?: {};
  nonTranslatableMessage?: string;
  err?: any;
}

@Injectable()
export class ErrorModalService {

  constructor(private modalService: NgbModal) {
  }

  open(title: string, body: string, error?: any) {
    const modalRef = this.modalService.open(ErrorModalComponent, { size: 'sm' });
    const instance = modalRef.componentInstance as ErrorModalComponent;
    instance.title = title;
    instance.body = body;
    instance.error = error;
  }

  openWithOptions(options: ErrorOptions) {
    const modalRef = this.modalService.open(ErrorModalComponent, { size: 'sm' });
    const instance = modalRef.componentInstance as ErrorModalComponent;
    instance.title = options.title;
    instance.body = options.body;
    instance.bodyParams = options.bodyParams;
    instance.nonTranslatableMessage = options.nonTranslatableMessage;
    instance.error = options.err;
  }

  openSubmitError(err?: any) {
    this.open('Submit error', 'Unexpected error', err);
  }
}

@Component({
  selector: 'app-error-modal',
  styleUrls: ['./error-modal.component.scss'],
  template: `
    <div class="modal-header modal-header-danger">
      <h4 class="modal-title">
        <a><i id="close_error_modal_link" class="fa fa-times" (click)="close()"></i></a>
        <span class="text-content-wrap">
          <i class="fa fa-exclamation-circle"></i>
          {{ title | translate }}
        </span>
      </h4>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-md-12">
          <p translate [translateParams]="bodyParams" class="text-content-wrap">{{body}}</p>
          <pre *ngIf="error">{{error | json}}</pre>
        </div>
        <div class="col-md-12 text-content-wrap" *ngIf="nonTranslatableMessage">
          <p>{{ nonTranslatableMessage }}</p>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button id="close_error_modal_button" type="button" class="btn btn-action" (click)="close()" translate>Close</button>
    </div>
  `
})
export class ErrorModalComponent {

  @Input() title: string;
  @Input() body: string;
  @Input() bodyParams?: {};
  @Input() nonTranslatableMessage: string | undefined;
  @Input() error?: any;

  constructor(private modal: NgbActiveModal) {
  }

  close() {
    this.modal.dismiss('cancel');
  }
}
