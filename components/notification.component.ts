import {
  ChangeDetectionStrategy, Component, ComponentFactoryResolver, Directive, ElementRef, HostBinding, Injector, Input, NgZone, OnDestroy, OnInit, Renderer2,
  ViewContainerRef
} from '@angular/core';
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { Subscription } from 'rxjs/Subscription';

export type Placement = 'auto'
                      | 'top'
                      | 'bottom'
                      | 'left'
                      | 'right'
                      | 'top-left'
                      | 'top-right'
                      | 'bottom-left'
                      | 'bottom-right'
                      | 'left-top'
                      | 'left-bottom'
                      | 'right-top'
                      | 'right-bottom';

type NotificationType = 'success'
                      | 'failure';

let nextId = 0;
const defaultDurationInMs = 3000;
const defaultPlacement = 'auto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./notification.component.scss'],
  template: `
    <div class="box">
      <div class="content">
        <div class="head">
          
          <svg *ngIf="type === 'success'" width="30" height="30" viewBox="0 0 24 19" version="1.1">
            <title>Line</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linejoin="round">
              <g id="Artboard" transform="translate(0.000000, -3.000000)" stroke-width="3" stroke="#FFFFFF">
                <polyline id="Line" points="1 12.7985128 9.6 20 23 4"></polyline>
              </g>
            </g>
          </svg>

          <svg *ngIf="type === 'failure'" width="30" height="30" viewBox="0 0 24 24" version="1.1">
            <title>fail icon</title>
            <desc>Created with Sketch.</desc>
            <defs>
              <circle id="path-1" cx="10" cy="10" r="10"></circle>
            </defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linejoin="round">
              <g id="Artboard-2">
                <g id="fail-icon" transform="translate(2.000000, 2.000000)">
                  <g id="Oval-4">
                    <use stroke="#BF3939" stroke-width="2" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#path-1"></use>
                    <use stroke="#FFFFFF" stroke-width="3" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#path-1"></use>
                  </g>
                  <path d="M3.62825513,3.62825513 L17.7272727,17.7272727" id="Line" stroke="#FFFFFF" stroke-width="3"></path>
                </g>
              </g>
            </g>
          </svg>
          
        </div>
        
        <strong>
          <ng-content></ng-content>
        </strong>
      </div>
    </div>
  `
})
export class NotificationWindowComponent implements OnInit, OnDestroy {

  @HostBinding('attr.id')
  @Input() id: string;
  @Input() location: ElementRef;
  @Input() placement: Placement;
  @Input() type: NotificationType;

  @HostBinding('class.popover') popover = true;
  @HostBinding('class.notification') notification = true;
  @HostBinding('attr.role') role = 'tooltip';

  private zoneSubscription: Subscription;

  constructor(private element: ElementRef,
              private renderer: Renderer2,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.refreshPosition();
    this.zoneSubscription = this.ngZone.onStable.subscribe(() => this.refreshPosition())
  }

  @HostBinding('class.success')
  get success() {
    return this.type === 'success';
  }

  @HostBinding('class.failure')
  get failure() {
    return this.type === 'failure';
  }

  private applyPlacement(placement: Placement) {
    // remove the current placement classes
    this.renderer.removeClass(this.element.nativeElement, 'bs-popover-' + this.placement.toString().split('-')[0]);
    this.renderer.removeClass(this.element.nativeElement, 'bs-popover-' + this.placement.toString());

    // set the new placement classes
    this.placement = placement;

    // apply the new placement
    this.renderer.addClass(this.element.nativeElement, 'bs-popover-' + this.placement.toString().split('-')[0]);
    this.renderer.addClass(this.element.nativeElement, 'bs-popover-' + this.placement.toString());
  }

  refreshPosition() {
    const position = positionElements(this.location.nativeElement, this.element.nativeElement, this.placement, true);
    this.applyPlacement(position);
  }

  ngOnDestroy() {
    if (this.zoneSubscription) {
      this.zoneSubscription.unsubscribe();
    }
  }
}

@Directive({
  selector: '[appNotification]',
  exportAs: 'notification'
})
export class NotificationDirective {

  private ngbPopoverWindowId = `app-notification-${nextId++}`;

  private popupService: PopupService<NotificationWindowComponent>|null = null;
  private timeoutHandle: number|null;

  constructor(private location: ViewContainerRef,
              private renderer: Renderer2,
              private injector: Injector,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  showSuccess(msg: string, durationInMs = defaultDurationInMs, placement: Placement = defaultPlacement) {
    this.show('success', msg, durationInMs, placement);
  }

  showFailure(msg: string, durationInMs = defaultDurationInMs, placement: Placement = defaultPlacement) {
    this.show('failure', msg, durationInMs, placement);
  }

  private isOpen() {
    return this.popupService !== null && this.timeoutHandle !== null;
  }

  private show(type: NotificationType, msg: string, durationInMs: number, placement: Placement) {

    if (this.isOpen()) {
      this.close(true);
    }

    this.popupService = new PopupService<NotificationWindowComponent>(
      NotificationWindowComponent,
      this.injector,
      this.location,
      this.renderer,
      this.componentFactoryResolver
    );

    const windowRef = this.popupService.open(msg, {});
    windowRef.instance.id = this.ngbPopoverWindowId;
    windowRef.instance.location = this.location.element;
    windowRef.instance.placement = placement;
    windowRef.instance.type = type;

    this.renderer.setAttribute(this.location.element.nativeElement, 'aria-describedby', this.ngbPopoverWindowId);

    window.document.querySelector('body')!.appendChild(windowRef.location.nativeElement);

    this.timeoutHandle = window.setTimeout(() => this.close(false), durationInMs);
  }

  private close(clearTimeout: boolean) {

    this.renderer.removeAttribute(this.location.element.nativeElement, 'aria-describedby');
    if (this.popupService === null || this.timeoutHandle === null) {
      throw new Error('Cannot close since notification is not shown');
    }
    if (clearTimeout) {
      window.clearTimeout(this.timeoutHandle);
    }
    this.popupService.close();
    this.popupService = null;
    this.timeoutHandle = null;
  }
}
