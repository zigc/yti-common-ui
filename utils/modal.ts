import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export function ignoreModalClose<T>(err: any): never|null {
  if (!isModalClose(err)) {
    throw err;
  } else {
    return null;
  }
}

export function isModalClose(err: any) {
  return err === 'cancel' || err === ModalDismissReasons.BACKDROP_CLICK || err === ModalDismissReasons.ESC;
}
