import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-block-actions',
  template: `
    <div fxLayout="row">
      <div fxFlex></div>
      <button mat-button (click)="toggleEdit.emit()" [disabled]="disabled">{{ actionToggle ? 'СОХРАНИТЬ' : 'РЕДАКТИРОВАТЬ'}}</button>
    </div>
  `,
  styles: []
})
export class BlockActionsComponent implements OnInit {

  @Output() toggleEdit = new EventEmitter<any>();
  @Input() disabled: boolean;

  actionToggle: boolean;

  constructor() {
  }

  ngOnInit() {
    this.toggleEdit.subscribe(tggl => this.actionToggle = !this.actionToggle);
  }

}
