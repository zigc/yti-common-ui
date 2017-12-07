import {Component, Injectable} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../services/user.service';

@Injectable()
export class LoginModalService {

  constructor(private modalService: NgbModal) {
  }

  open() {
    this.modalService.open(LoginModalComponent, { size: 'sm' }).result;
  }
}

@Component({
  selector: 'app-login-modal',
  styleUrls: ['./login-modal.component.scss'],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">
        <a><i class="fa fa-times" (click)="cancel()"></i></a>
        <span translate>Login</span>
      </h4>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-md-12">
          <p translate>eDuuni information</p>
          <p translate>Login information</p>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-action" (click)="login()" translate>Log In</button>
      <button type="button" class="btn btn-action" (click)="register()" translate>Register</button>
    </div>
  `
})
export class LoginModalComponent {

  constructor(private modal: NgbActiveModal,
              private userService: UserService) {
  }

  cancel() {
    this.modal.dismiss('cancel');
  }

  login() {
    this.userService.login();
  }

  register() {
    this.userService.register();
  }
}
