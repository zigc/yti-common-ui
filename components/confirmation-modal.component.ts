import { Component, Injectable, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ConfirmationModalService {

  constructor(private modalService: NgbModal) {
  }

  open(title: string, ...bodyParagraphs: string[]): Promise<any> {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { size: 'sm' });
    const instance = modalRef.componentInstance as ConfirmationModalComponent;
    instance.title = title;
    instance.bodyParagraphs = bodyParagraphs;
    return modalRef.result;
  }

  openEditInProgress() {
    return this.open('Edit in progress', 'Are you sure that you want to continue? By continuing unsaved changes will be lost.');
  }

  openModalClose() {
    return this.open('Modals are open', 'Are you sure that you want to continue? By continuing all modals will be closed.');
  }
}

@Component({
  selector: 'app-confirmation-modal',
  styleUrls: ['./confirmation-modal.component.scss'],
  template: `
    <div class="modal-header modal-header-warning">
      <h4 class="modal-title">
        <a><i id="close_confirmation_modal_link" class="fa fa-times" (click)="cancel()"></i></a>
        <span>{{title | translate}}</span>
      </h4>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-md-12">
          <p *ngFor="let paragraph of bodyParagraphs">{{paragraph | translate}}</p>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button id="confirm_confirmation_modal_button" type="button" class="btn btn-secondary-action confirm" (click)="confirm()" translate>Yes</button>
      <button id="cancel_confirmation_modal_button" type="button" class="btn btn-link cancel" (click)="cancel()" translate>Cancel</button>
    </div>
  `
})
export class ConfirmationModalComponent {

  @Input() title: string;
  @Input() bodyParagraphs: string[];

  constructor(private modal: NgbActiveModal) {
  }

  cancel() {
    this.modal.dismiss('cancel');
  }

  confirm() {
    this.modal.close();
  }
}
