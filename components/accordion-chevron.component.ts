import { Component, Input } from '@angular/core';
import { NgbPanel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-accordion-chevron',
  template: `<span [id]="id" 
                   style="font-size: large" 
                   class="fa" 
                   [class.fa-angle-down]="open" 
                   [class.fa-angle-right]="!open"></span>`
})
export class AccordionChevronComponent {

  @Input() id: string;

  constructor(private ngbPanel: NgbPanel) {
  }

  get open() {
    return this.ngbPanel.isOpen;
  }
}
